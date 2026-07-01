const AUTH_URL = 'https://functions.poehali.dev/c6a9b4d2-0765-47e3-94e5-5f66cac36f29';
const CONTENT_URL = 'https://functions.poehali.dev/2d862a1f-8678-4638-9e55-00990ae42641';

const TOKEN_KEY = 'aurum_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

function authHeaders(): Record<string, string> {
  const token = getToken();
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) h['X-Auth-Token'] = token;
  return h;
}

async function parse(res: Response) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Ошибка запроса');
  return data;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phone?: string;
}

export const authApi = {
  async login(email: string, password: string) {
    const res = await fetch(`${AUTH_URL}?action=login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return parse(res) as Promise<{ token: string; user: User }>;
  },
  async register(name: string, email: string, password: string, phone?: string) {
    const res = await fetch(`${AUTH_URL}?action=register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, phone }),
    });
    return parse(res) as Promise<{ token: string; user: User }>;
  },
  async me() {
    const res = await fetch(`${AUTH_URL}?action=me`, { headers: authHeaders() });
    return parse(res) as Promise<{ user: User }>;
  },
  async logout() {
    await fetch(`${AUTH_URL}?action=logout`, { method: 'POST', headers: authHeaders() });
  },
};

export const contentApi = {
  async list<T = unknown>(section: string): Promise<T[]> {
    const res = await fetch(`${CONTENT_URL}?section=${section}`, { headers: authHeaders() });
    const data = await parse(res);
    return data.items as T[];
  },
  async create<T = unknown>(section: string, payload: Record<string, unknown>): Promise<T> {
    const res = await fetch(`${CONTENT_URL}?section=${section}`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await parse(res);
    return data.item as T;
  },
  async update<T = unknown>(section: string, payload: Record<string, unknown>): Promise<T> {
    const res = await fetch(`${CONTENT_URL}?section=${section}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await parse(res);
    return data.item as T;
  },
  async remove(section: string, id: number): Promise<void> {
    const res = await fetch(`${CONTENT_URL}?section=${section}&id=${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    await parse(res);
  },
};