import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

const navLinks = [
  { label: 'Каталог', href: '#catalog' },
  { label: 'О сервисе', href: '#about' },
  { label: 'Преимущества', href: '#advantages' },
  { label: 'Тарифы', href: '#pricing' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Контакты', href: '#contacts' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-sm gold-gradient">
            <Icon name="Gem" size={18} className="text-primary-foreground" />
          </div>
          <span className="font-display text-2xl font-bold tracking-widest text-foreground">
            AURUM
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="story-link text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-gold">
            <Icon name="User" size={16} />
            Кабинет
          </Button>
          <Button className="gold-gradient font-medium text-primary-foreground hover:opacity-90">
            Забронировать
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="text-foreground">
              <Icon name="Menu" size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="border-border bg-card">
            <SheetHeader>
              <SheetTitle className="font-display text-2xl tracking-widest text-gold">
                AURUM
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              ))}
              <Button className="mt-4 gold-gradient font-medium text-primary-foreground">
                Забронировать
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
