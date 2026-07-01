import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const columns = [
  {
    title: 'Автопарк',
    links: ['Люкс-класс', 'Бизнес-класс', 'Спорткары', 'Внедорожники', 'Новинки'],
  },
  {
    title: 'Компания',
    links: ['О сервисе', 'Преимущества', 'Блог', 'Вакансии', 'Партнёрам'],
  },
  {
    title: 'Клиентам',
    links: ['Тарифы', 'Страховка', 'Условия аренды', 'FAQ', 'Личный кабинет'],
  },
];

const Footer = () => {
  return (
    <footer id="contacts" className="border-t border-border bg-card noise-bg">
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-sm gold-gradient">
                <Icon name="Gem" size={18} className="text-primary-foreground" />
              </div>
              <span className="font-display text-2xl font-bold tracking-widest">AURUM</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Премиальная аренда автомобилей класса люкс. Персональный сервис,
              безупречное состояние машин и внимание к каждой детали.
            </p>
            <div className="mt-6 flex gap-3">
              {['Instagram', 'Send', 'Youtube', 'Phone'].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-sm gold-border text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
                >
                  <Icon name={icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-gold">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10 bg-border" />

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex w-full max-w-md items-center gap-2">
            <Input
              placeholder="Ваш e-mail для спецпредложений"
              className="border-border bg-background"
            />
            <Button className="gold-gradient font-medium text-primary-foreground">
              Подписаться
            </Button>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="story-link">Политика</a>
            <a href="#" className="story-link">Оферта</a>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          © 2026 AURUM. Все права защищены. Сделано с вниманием к деталям.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
