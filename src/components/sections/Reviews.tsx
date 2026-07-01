import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Icon from '@/components/ui/icon';

const reviews = [
  {
    name: 'Александр Волков',
    role: 'Предприниматель',
    text: 'Арендовал Bentley на выходные — сервис безупречный. Машину доставили вовремя, в идеальном состоянии. Однозначно вернусь.',
    rating: 5,
  },
  {
    name: 'Екатерина Смирнова',
    role: 'Event-менеджер',
    text: 'Заказывала авто на свадьбу. Всё прошло идеально: подача точно ко времени, водитель вежливый, машина сияла.',
    rating: 5,
  },
  {
    name: 'Дмитрий Козлов',
    role: 'Топ-менеджер',
    text: 'Пользуюсь AURUM для деловых поездок уже год. Персональный менеджер решает любые вопросы моментально.',
    rating: 5,
  },
  {
    name: 'Мария Орлова',
    role: 'Блогер',
    text: 'Огромный выбор премиум-авто, честные цены и никаких скрытых платежей. Рекомендую всем друзьям!',
    rating: 5,
  },
];

const Reviews = () => {
  return (
    <section id="reviews" className="py-24">
      <div className="container">
        <div className="mb-14 text-center">
          <Badge className="mb-4 gold-border bg-transparent px-4 py-1.5 text-xs uppercase tracking-widest text-gold">
            Отзывы
          </Badge>
          <h2 className="font-display text-4xl font-bold md:text-5xl">Что говорят клиенты</h2>
        </div>

        <Carousel opts={{ align: 'start', loop: true }} className="mx-auto max-w-6xl">
          <CarouselContent>
            {reviews.map((r) => (
              <CarouselItem key={r.name} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full border-border bg-card transition-colors hover:gold-border">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-gold" />
                      ))}
                    </div>
                    <Icon name="Quote" size={28} className="mb-3 text-gold/40" />
                    <p className="mb-6 leading-relaxed text-muted-foreground">{r.text}</p>
                    <div className="flex items-center gap-3">
                      <Avatar className="gold-gradient">
                        <AvatarFallback className="bg-transparent font-medium text-primary-foreground">
                          {r.name.split(' ').map((n) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{r.name}</div>
                        <div className="text-xs text-muted-foreground">{r.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="gold-border bg-card text-gold" />
          <CarouselNext className="gold-border bg-card text-gold" />
        </Carousel>
      </div>
    </section>
  );
};

export default Reviews;
