import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const packages = {
  basic: {
    name: 'Базовая',
    price: 'Включена',
    items: ['ОСАГО', 'Ответственность перед третьими лицами', 'Круглосуточная эвакуация'],
  },
  full: {
    name: 'Полная (КАСКО)',
    price: '+ 2 000 ₽/сут',
    items: [
      'Всё из базовой',
      'Ущерб автомобилю',
      'Угон и полная гибель',
      'Без франшизы',
      'Замена авто при поломке',
    ],
  },
  premium: {
    name: 'Персона',
    price: '+ 4 500 ₽/сут',
    items: [
      'Всё из полной',
      'Личная страховка водителя',
      'Медицинская помощь в пути',
      'Юридическое сопровождение',
      'Компенсация простоя',
    ],
  },
};

const Insurance = () => {
  return (
    <section id="insurance" className="py-24 bg-secondary/30 noise-bg">
      <div className="container">
        <div className="mb-14 text-center">
          <Badge className="mb-4 gold-border bg-transparent px-4 py-1.5 text-xs uppercase tracking-widest text-gold">
            Страховка
          </Badge>
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            Спокойствие в каждой поездке
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Выберите уровень защиты — от базовой до максимального пакета «Персона».
          </p>
        </div>

        <Tabs defaultValue="full" className="mx-auto max-w-3xl">
          <TabsList className="grid w-full grid-cols-3 bg-secondary">
            {Object.entries(packages).map(([key, p]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="data-[state=active]:gold-gradient data-[state=active]:text-primary-foreground"
              >
                {p.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(packages).map(([key, p]) => (
            <TabsContent key={key} value={key}>
              <Card className="gold-border bg-card">
                <CardContent className="pt-8">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-sm gold-gradient">
                        <Icon name="ShieldCheck" size={26} className="text-primary-foreground" />
                      </div>
                      <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                    </div>
                    <span className="font-display text-xl font-bold text-gold">{p.price}</span>
                  </div>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {p.items.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <Icon name="CircleCheck" size={18} className="text-gold" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-8 w-full gold-gradient font-medium text-primary-foreground hover:opacity-90">
                    Подключить пакет
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Insurance;
