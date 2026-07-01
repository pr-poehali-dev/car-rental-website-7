import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/10910bdc-8958-4092-a589-39bbc3cf96b8/files/288ceb98-69b6-44ca-b521-191376938449.jpg';

const Hero = () => {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="Премиум автомобиль" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      <div className="container relative z-10 pt-24">
        <div className="max-w-2xl animate-fade-in">
          <Badge className="mb-6 gold-border bg-transparent px-4 py-1.5 text-xs uppercase tracking-widest text-gold">
            <Icon name="Sparkles" size={14} className="mr-2" />
            Элитная аренда с 2010 года
          </Badge>

          <h1 className="font-display text-5xl font-bold leading-[1.05] md:text-7xl lg:text-8xl">
            Аренда авто
            <br />
            <span className="gold-text-gradient">премиум-класса</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Более 200 автомобилей класса люкс. Онлайн-бронирование за 2 минуты,
            доставка к подъезду и персональный сервис 24/7.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              size="lg"
              className="gold-gradient px-8 text-base font-medium text-primary-foreground hover:opacity-90"
            >
              Выбрать автомобиль
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gold-border bg-transparent px-8 text-base text-foreground hover:bg-secondary"
            >
              <Icon name="Play" size={18} className="mr-2" />
              Смотреть парк
            </Button>
          </div>

          <div className="mt-14 flex flex-wrap gap-10">
            {[
              { value: '200+', label: 'Автомобилей' },
              { value: '15 лет', label: 'На рынке' },
              { value: '4.9', label: 'Рейтинг' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-4xl font-bold text-gold">{stat.value}</div>
                <div className="text-sm uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <a
        href="#catalog"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-gold/70 transition-colors hover:text-gold"
      >
        <Icon name="ChevronsDown" size={28} />
      </a>
    </section>
  );
};

export default Hero;
