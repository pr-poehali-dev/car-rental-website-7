import json
import os
import hashlib
import secrets
from datetime import datetime, timedelta
import psycopg2
from psycopg2.extras import RealDictCursor

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
    'Access-Control-Max-Age': '86400',
}


def _resp(status: int, body: dict):
    return {
        'statusCode': status,
        'headers': {**CORS_HEADERS, 'Content-Type': 'application/json'},
        'isBase64Encoded': False,
        'body': json.dumps(body, default=str),
    }


def _hash(password: str) -> str:
    return hashlib.sha256(password.encode('utf-8')).hexdigest()


def _db():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def _user_by_token(cur, token: str):
    if not token:
        return None
    cur.execute(
        "SELECT u.id, u.name, u.email, u.role, u.phone FROM users u "
        "JOIN sessions s ON s.user_id = u.id "
        "WHERE s.token = %s AND s.expires_at > NOW()",
        (token,),
    )
    return cur.fetchone()


def handler(event: dict, context) -> dict:
    '''Авторизация: регистрация, вход, профиль текущего пользователя с ролями.'''
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'isBase64Encoded': False, 'body': ''}

    params = event.get('queryStringParameters') or {}
    action = params.get('action', '')
    headers = event.get('headers') or {}
    token = headers.get('X-Auth-Token') or headers.get('x-auth-token') or ''

    conn = _db()
    try:
        cur = conn.cursor(cursor_factory=RealDictCursor)

        if method == 'GET' and action == 'me':
            user = _user_by_token(cur, token)
            if not user:
                return _resp(401, {'error': 'Не авторизован'})
            return _resp(200, {'user': dict(user)})

        if method == 'POST':
            body = json.loads(event.get('body') or '{}')

            if action == 'register':
                name = (body.get('name') or '').strip()
                email = (body.get('email') or '').strip().lower()
                password = body.get('password') or ''
                phone = (body.get('phone') or '').strip()
                if not name or not email or len(password) < 4:
                    return _resp(400, {'error': 'Заполните имя, email и пароль (мин. 4 символа)'})
                cur.execute("SELECT id FROM users WHERE email = %s", (email,))
                if cur.fetchone():
                    return _resp(409, {'error': 'Пользователь с таким email уже существует'})
                cur.execute(
                    "INSERT INTO users (name, email, password_hash, role, phone) "
                    "VALUES (%s, %s, %s, 'user', %s) RETURNING id, name, email, role, phone",
                    (name, email, _hash(password), phone),
                )
                user = cur.fetchone()
                new_token = secrets.token_hex(32)
                expires = datetime.utcnow() + timedelta(days=30)
                cur.execute(
                    "INSERT INTO sessions (user_id, token, expires_at) VALUES (%s, %s, %s)",
                    (user['id'], new_token, expires),
                )
                conn.commit()
                return _resp(200, {'token': new_token, 'user': dict(user)})

            if action == 'login':
                email = (body.get('email') or '').strip().lower()
                password = body.get('password') or ''
                cur.execute(
                    "SELECT id, name, email, role, phone FROM users "
                    "WHERE email = %s AND password_hash = %s",
                    (email, _hash(password)),
                )
                user = cur.fetchone()
                if not user:
                    return _resp(401, {'error': 'Неверный email или пароль'})
                new_token = secrets.token_hex(32)
                expires = datetime.utcnow() + timedelta(days=30)
                cur.execute(
                    "INSERT INTO sessions (user_id, token, expires_at) VALUES (%s, %s, %s)",
                    (user['id'], new_token, expires),
                )
                conn.commit()
                return _resp(200, {'token': new_token, 'user': dict(user)})

            if action == 'logout':
                if token:
                    cur.execute("UPDATE sessions SET expires_at = NOW() WHERE token = %s", (token,))
                    conn.commit()
                return _resp(200, {'ok': True})

        return _resp(400, {'error': 'Неизвестное действие'})
    finally:
        conn.close()
