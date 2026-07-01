import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { cars, carClasses } from '@/data/cars';

const SectionTitle = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <div className="mb-12 text-center">
    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
      {eyebrow}
    </span>
    <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">{title}</h2>
  </div>
);

const Catalog = () => {
  const [filter, setFilter] = useState('Все');
  const { toast } = useToast();

  const filtered = filter === 'Все' ? cars : cars.filter((c) => c.class === filter);

  return (
    <section id="catalog" className="py-24 noise-bg">
      <div className="container">
        <SectionTitle eyebrow="Автопарк" title="Каталог автомобилей" />

        <Tabs value={filter} onValueChange={setFilter} className="mb-12 flex justify-center">
          <TabsList className="flex-wrap bg-secondary">
            {carClasses.map((c) => (
              <TabsTrigger
                key={c}
                value={c}
                className="data-[state=active]:gold-gradient data-[state=active]:text-primary-foreground"
              >
                {c}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((car) => (
            <Card
              key={car.id}
              className="group overflow-hidden border-border bg-card transition-all duration-500 hover:gold-border hover:shadow-2xl hover:shadow-black/50"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                {car.badge && (
                  <Badge className="absolute left-4 top-4 gold-gradient text-primary-foreground">
                    {car.badge}
                  </Badge>
                )}
                <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full glass px-2.5 py-1 text-sm">
                  <Icon name="Star" size={14} className="text-gold" />
                  <span className="font-medium">{car.rating}</span>
                </div>
              </div>

              <CardContent className="pt-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {car.brand}
                    </p>
                    <h3 className="font-display text-2xl font-semibold">{car.name}</h3>
                  </div>
                  <Badge variant="outline" className="gold-border text-gold">
                    {car.class}
                  </Badge>
                </div>

                <Separator className="my-4 bg-border" />

                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    { icon: 'Gauge', label: `${car.power} л.с.` },
                    { icon: 'Settings', label: car.transmission },
                    { icon: 'Users', label: `${car.seats} места` },
                  ].map((spec) => (
                    <Tooltip key={spec.label}>
                      <TooltipTrigger asChild>
                        <div className="flex flex-col items-center gap-1 text-muted-foreground">
                          <Icon name={spec.icon} size={18} className="text-gold" />
                          <span className="text-xs">{spec.label}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>{spec.label}</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex items-center justify-between">
                <div>
                  <span className="font-display text-2xl font-bold text-gold">
                    {car.pricePerDay.toLocaleString('ru-RU')} ₽
                  </span>
                  <span className="text-sm text-muted-foreground"> / сутки</span>
                </div>
                <Button
                  className="gold-gradient font-medium text-primary-foreground hover:opacity-90"
                  onClick={() =>
                    toast({
                      title: `${car.brand} ${car.name}`,
                      description: 'Автомобиль добавлен в бронирование.',
                    })
                  }
                >
                  Арендовать
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            className="gold-border bg-transparent px-10 text-foreground hover:bg-secondary"
          >
            Показать весь парк
            <Icon name="ArrowRight" size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
