import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/context/AuthContext';
import { adminSections } from '@/config/adminSections';
import { contentApi } from '@/lib/api';
import SectionManager from '@/components/admin/SectionManager';

const Dashboard = () => {
  const [stats, setStats] = useState<Record<string, number>>({});
  const cards = [
    { key: 'cars', label: 'Автомобилей', icon: 'Car' },
    { key: 'bookings', label: 'Заявок', icon: 'Inbox' },
    { key: 'reviews', label: 'Отзывов', icon: 'Star' },
    { key: 'blog', label: 'Статей', icon: 'Newspaper' },
    { key: 'users', label: 'Пользователей', icon: 'Users' },
    { key: 'faqs', label: 'Вопросов FAQ', icon: 'CircleHelp' },
  ];

  useEffect(() => {
    cards.forEach(async (c) => {
      try {
        const items = await contentApi.list(c.key);
        setStats((s) => ({ ...s, [c.key]: items.length }));
      } catch {
        setStats((s) => ({ ...s, [c.key]: 0 }));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2 className="mb-6 font-display text-3xl font-bold">Обзор</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Card key={c.key} className="border-border bg-card transition-colors hover:gold-border">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-sm gold-gradient">
                <Icon name={c.icon} size={26} className="text-primary-foreground" />
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-gold">
                  {stats[c.key] ?? '—'}
                </div>
                <div className="text-sm text-muted-foreground">{c.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Admin = () => {
  const { user, logout } = useAuth();
  const [active, setActive] = useState('dashboard');

  const NavContent = ({ onNavigate }: { onNavigate?: () => void }) => (
    <div className="flex h-full flex-col">
      <Link to="/" className="mb-8 flex items-center gap-2 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-sm gold-gradient">
          <Icon name="Gem" size={18} className="text-primary-foreground" />
        </div>
        <span className="font-display text-2xl font-bold tracking-widest">AURUM</span>
      </Link>

      <ScrollArea className="flex-1">
        <nav className="space-y-1 pr-3">
          <button
            onClick={() => {
              setActive('dashboard');
              onNavigate?.();
            }}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
              active === 'dashboard'
                ? 'gold-gradient text-primary-foreground'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
          >
            <Icon name="LayoutDashboard" size={18} />
            Обзор
          </button>
          {adminSections.map((s) => (
            <button
              key={s.key}
              onClick={() => {
                setActive(s.key);
                onNavigate?.();
              }}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                active === s.key
                  ? 'gold-gradient text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <Icon name={s.icon} size={18} />
              {s.title}
            </button>
          ))}
        </nav>
      </ScrollArea>

      <Separator className="my-4 bg-border" />
      <div className="px-2">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full gold-gradient text-sm font-medium text-primary-foreground">
            {user?.name?.[0]}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">{user?.name}</div>
            <div className="truncate text-xs text-gold">Администратор</div>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={logout} className="w-full border-border">
          <Icon name="LogOut" size={15} className="mr-2" />
          Выйти
        </Button>
      </div>
    </div>
  );

  const activeConfig = adminSections.find((s) => s.key === active);

  return (
    <div className="dark min-h-screen bg-background noise-bg text-foreground">
      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-card p-4 lg:block">
          <NavContent />
        </aside>

        <div className="flex-1">
          {/* Mobile header */}
          <div className="flex items-center justify-between border-b border-border bg-card p-4 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Icon name="Menu" size={22} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 border-border bg-card p-4">
                <NavContent onNavigate={() => document.body.click()} />
              </SheetContent>
            </Sheet>
            <span className="font-display text-xl font-bold tracking-widest">AURUM</span>
            <span className="w-9" />
          </div>

          <main className="p-6 lg:p-10">
            {active === 'dashboard' ? <Dashboard /> : activeConfig && <SectionManager config={activeConfig} />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;
