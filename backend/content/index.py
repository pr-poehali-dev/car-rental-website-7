import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
    'Access-Control-Max-Age': '86400',
}

# Конфигурация секций: таблица, поля, есть ли публичный доступ
SECTIONS = {
    'cars': {
        'table': 'cars',
        'fields': ['name', 'brand', 'car_class', 'price_per_day', 'year', 'power',
                   'transmission', 'fuel', 'seats', 'rating', 'reviews', 'image', 'badge', 'is_active'],
        'order': 'id DESC',
    },
    'advantages': {
        'table': 'advantages',
        'fields': ['icon', 'title', 'text', 'sort_order'],
        'order': 'sort_order ASC, id ASC',
    },
    'pricing': {
        'table': 'pricing_plans',
        'fields': ['name', 'price', 'description', 'features', 'featured', 'sort_order'],
        'order': 'sort_order ASC, id ASC',
        'json_fields': ['features'],
    },
    'reviews': {
        'table': 'reviews',
        'fields': ['name', 'role', 'text', 'rating', 'is_published'],
        'order': 'id DESC',
    },
    'conditions': {
        'table': 'conditions',
        'fields': ['icon', 'title', 'text', 'sort_order'],
        'order': 'sort_order ASC, id ASC',
    },
    'insurance': {
        'table': 'insurance_packages',
        'fields': ['key', 'name', 'price', 'items', 'sort_order'],
        'order': 'sort_order ASC, id ASC',
        'json_fields': ['items'],
    },
    'blog': {
        'table': 'blog_posts',
        'fields': ['title', 'category', 'text', 'image', 'published_at', 'is_published'],
        'order': 'published_at DESC, id DESC',
    },
    'faqs': {
        'table': 'faqs',
        'fields': ['question', 'answer', 'sort_order'],
        'order': 'sort_order ASC, id ASC',
    },
    'bookings': {
        'table': 'bookings',
        'fields': ['name', 'phone', 'message', 'car_id', 'status'],
        'order': 'id DESC',
        'admin_read': True,
    },
    'users': {
        'table': 'users',
        'fields': ['name', 'email', 'role', 'phone'],
        'order': 'id DESC',
        'admin_read': True,
        'admin_only': True,
    },
}


def _resp(status, body):
    return {
        'statusCode': status,
        'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
        'isBase64Encoded': False,
        'body': json.dumps(body, default=str),
    }


def _db():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def _current_user(cur, token):
    if not token:
        return None
    cur.execute(
        "SELECT u.id, u.role FROM users u JOIN sessions s ON s.user_id = u.id "
        "WHERE s.token = %s AND s.expires_at > NOW()",
        (token,),
    )
    return cur.fetchone()


def _serialize(row, cfg):
    row = dict(row)
    for jf in cfg.get('json_fields', []):
        val = row.get(jf)
        if isinstance(val, str):
            try:
                row[jf] = json.loads(val)
            except Exception:
                row[jf] = []
    return row


def handler(event: dict, context) -> dict:
    '''Универсальный CRUD для всех секций сайта: авто, тарифы, отзывы, блог, FAQ и др. с проверкой ролей.'''
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'isBase64Encoded': False, 'body': ''}

    params = event.get('queryStringParameters') or {}
    section = params.get('section', '')
    cfg = SECTIONS.get(section)
    if not cfg:
        return _resp(400, {'error': 'Неизвестная секция'})

    headers = event.get('headers') or {}
    token = headers.get('X-Auth-Token') or headers.get('x-auth-token') or ''

    conn = _db()
    try:
        cur = conn.cursor(cursor_factory=RealDictCursor)
        user = _current_user(cur, token)
        is_admin = bool(user and user['role'] == 'admin')
        table = cfg['table']
        fields = cfg['fields']

        # READ
        if method == 'GET':
            if cfg.get('admin_read') and not is_admin:
                return _resp(403, {'error': 'Доступ запрещён'})
            cur.execute(f"SELECT * FROM {table} ORDER BY {cfg['order']}")
            rows = [_serialize(r, cfg) for r in cur.fetchall()]
            return _resp(200, {'items': rows})

        body = json.loads(event.get('body') or '{}')

        # CREATE booking доступен всем (заявки с сайта)
        public_create = section == 'bookings' and method == 'POST'

        if not is_admin and not public_create:
            return _resp(403, {'error': 'Требуются права администратора'})
        if cfg.get('admin_only') and not is_admin:
            return _resp(403, {'error': 'Доступ запрещён'})

        # CREATE
        if method == 'POST':
            cols = [f for f in fields if f in body]
            if not cols:
                return _resp(400, {'error': 'Нет данных для создания'})
            vals = []
            for f in cols:
                v = body[f]
                if f in cfg.get('json_fields', []):
                    v = json.dumps(v, ensure_ascii=False)
                vals.append(v)
            placeholders = ', '.join(['%s'] * len(cols))
            col_names = ', '.join(cols)
            cur.execute(
                f"INSERT INTO {table} ({col_names}) VALUES ({placeholders}) RETURNING *",
                vals,
            )
            row = _serialize(cur.fetchone(), cfg)
            conn.commit()
            return _resp(200, {'item': row})

        # UPDATE
        if method == 'PUT':
            item_id = body.get('id')
            if not item_id:
                return _resp(400, {'error': 'Не указан id'})
            cols = [f for f in fields if f in body]
            if not cols:
                return _resp(400, {'error': 'Нет данных для обновления'})
            sets = []
            vals = []
            for f in cols:
                v = body[f]
                if f in cfg.get('json_fields', []):
                    v = json.dumps(v, ensure_ascii=False)
                sets.append(f"{f} = %s")
                vals.append(v)
            vals.append(item_id)
            cur.execute(
                f"UPDATE {table} SET {', '.join(sets)} WHERE id = %s RETURNING *",
                vals,
            )
            row = cur.fetchone()
            conn.commit()
            if not row:
                return _resp(404, {'error': 'Запись не найдена'})
            return _resp(200, {'item': _serialize(row, cfg)})

        # DELETE
        if method == 'DELETE':
            item_id = params.get('id') or body.get('id')
            if not item_id:
                return _resp(400, {'error': 'Не указан id'})
            cur.execute(f"DELETE FROM {table} WHERE id = %s", (int(item_id),))
            conn.commit()
            return _resp(200, {'ok': True, 'id': int(item_id)})

        return _resp(405, {'error': 'Метод не поддерживается'})
    finally:
        conn.close()
