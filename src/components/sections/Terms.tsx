import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { contentApi } from '@/lib/api';

interface Condition {
  id: number;
  icon: string;
  title: string;
  text: string;
  sort_order?: number;
}

const rules = [
  {
    q: 'Какие документы нужны для аренды?',
    a: 'Паспорт, водительское удостоверение категории B и банковская карта на имя арендатора для внесения депозита.',
  },
  {
    q: 'Можно ли выезжать в другой город?',
    a: 'Да, междугородние поездки разрешены. Для выезда за границу требуется отдельное согласование и оформление документов.',
  },
  {
    q: 'Что делать в случае ДТП?',
    a: 'Незамедлительно свяжитесь с нашей поддержкой 24/7. Все автомобили застрахованы по КАСКО, мы поможем оформить все документы.',
  },
  {
    q: 'Можно ли продлить аренду?',
    a: 'Конечно. Свяжитесь с менеджером за 24 часа до окончания срока — мы продлим бронь при наличии автомобиля.',
  },
];

const Terms = () => {
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    contentApi
      .list<Condition>('conditions')
      .then(setConditions)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="terms" className="py-24">
      <div className="container">
        <div className="mb-14 text-center">
          <Badge className="mb-4 gold-border bg-transparent px-4 py-1.5 text-xs uppercase tracking-widest text-gold">
            Условия
          </Badge>
          <h2 className="font-display text-4xl font-bold md:text-5xl">Условия аренды</h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="grid gap-5">
            {loading
              ? [...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-28 w-full rounded-lg bg-card" />
                ))
              : conditions.map((c) => (
                  <Card key={c.id} className="border-border bg-card transition-colors hover:gold-border">
                    <CardContent className="flex items-start gap-4 pt-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm gold-gradient">
                        <Icon name={c.icon} size={22} className="text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-display text-xl font-semibold">{c.title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">{c.text}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </div>

          <Accordion type="single" collapsible className="w-full">
            {rules.map((rule, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left font-display text-lg hover:text-gold hover:no-underline">
                  {rule.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{rule.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Terms;
