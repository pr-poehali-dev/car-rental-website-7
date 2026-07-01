import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import Icon from '@/components/ui/icon';

const Login = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [regData, setRegData] = useState({ name: '', email: '', password: '', phone: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(loginData.email, loginData.password);
      toast({ title: 'Добро пожаловать!', description: 'Вы успешно вошли.' });
      navigate('/');
    } catch (err) {
      toast({ title: 'Ошибка входа', description: (err as Error).message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(regData.name, regData.email, regData.password, regData.phone);
      toast({ title: 'Регистрация успешна!', description: 'Аккаунт создан.' });
      navigate('/');
    } catch (err) {
      toast({ title: 'Ошибка', description: (err as Error).message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark flex min-h-screen items-center justify-center bg-background noise-bg px-4">
      <div className="absolute inset-0 radial-glow" />
      <Card className="relative z-10 w-full max-w-md gold-border bg-card">
        <CardHeader className="text-center">
          <Link to="/" className="mx-auto mb-2 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-sm gold-gradient">
              <Icon name="Gem" size={18} className="text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold tracking-widest">AURUM</span>
          </Link>
          <p className="text-sm text-muted-foreground">Личный кабинет и панель управления</p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2 bg-secondary">
              <TabsTrigger value="login" className="data-[state=active]:gold-gradient data-[state=active]:text-primary-foreground">
                Вход
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:gold-gradient data-[state=active]:text-primary-foreground">
                Регистрация
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    required
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="border-border bg-background"
                    placeholder="admin@aurum.ru"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Пароль</Label>
                  <Input
                    type="password"
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="border-border bg-background"
                    placeholder="••••••••"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full gold-gradient font-medium text-primary-foreground hover:opacity-90">
                  {loading ? 'Вход...' : 'Войти'}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Демо-админ: admin@aurum.ru / admin123
                </p>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label>Имя</Label>
                  <Input
                    required
                    value={regData.name}
                    onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                    className="border-border bg-background"
                    placeholder="Ваше имя"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    required
                    value={regData.email}
                    onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                    className="border-border bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Телефон</Label>
                  <Input
                    value={regData.phone}
                    onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                    className="border-border bg-background"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Пароль</Label>
                  <Input
                    type="password"
                    required
                    value={regData.password}
                    onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                    className="border-border bg-background"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full gold-gradient font-medium text-primary-foreground hover:opacity-90">
                  {loading ? 'Создаём...' : 'Зарегистрироваться'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
