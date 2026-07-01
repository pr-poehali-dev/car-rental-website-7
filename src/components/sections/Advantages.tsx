import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const items = [
  {
    icon: 'ShieldCheck',
    title: 'Полная страховка',
    text: 'КАСКО и ОСАГО включены в стоимость. Вы защищены в любой поездке.',
  },
  {
    icon: 'Truck',
    title: 'Доставка авто',
    text: 'Привезём автомобиль к подъезду, в аэропорт или отель бесплатно.',
  },
  {
    icon: 'Clock',
    title: 'Поддержка 24/7',
    text: 'Персональный менеджер на связи круглосуточно, без выходных.',
  },
  {
    icon: 'Sparkles',
    title: 'Идеальное состояние',
    text: 'Детейлинг и техосмотр перед каждой выдачей автомобиля.',
  },
  {
    icon: 'CreditCard',
    title: 'Удобная оплата',
    text: 'Картой, переводом или наличными. Прозрачные условия без скрытых платежей.',
  },
  {
    icon: 'MapPin',
    title: 'Геолокация',
    text: 'Отслеживайте доставку и находите ближайшие точки выдачи на карте.',
  },
];

const Advantages = () => {
  return (
    <section id="advantages" className="py-24 bg-secondary/30 noise-bg">
      <div className="container">
        <div className="mb-14 text-center">
          <Badge className="mb-4 gold-border bg-transparent px-4 py-1.5 text-xs uppercase tracking-widest text-gold">
            Почему AURUM
          </Badge>
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            Преимущества сервиса
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card
              key={item.title}
              className="group border-border bg-card transition-all duration-500 hover:gold-border hover:-translate-y-2"
            >
              <CardContent className="pt-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-sm bg-secondary transition-colors group-hover:gold-gradient">
                  <Icon
                    name={item.icon}
                    size={26}
                    className="text-gold transition-colors group-hover:text-primary-foreground"
                  />
                </div>
                <h3 className="mb-3 font-display text-2xl font-semibold">{item.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
