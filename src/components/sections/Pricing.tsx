import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import Icon from '@/components/ui/icon';
import { contentApi } from '@/lib/api';

interface Plan {
  id: number;
  name: string;
  price: string;
  description: string;
  features: string[];
  featured: boolean;
  sort_order?: number;
}

const Pricing = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    contentApi
      .list<Plan>('pricing')
      .then(setPlans)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="pricing" className="py-24 bg-secondary/30 noise-bg">
      <div className="container">
        <div className="mb-14 text-center">
          <Badge className="mb-4 gold-border bg-transparent px-4 py-1.5 text-xs uppercase tracking-widest text-gold">
            Тарифы
          </Badge>
          <h2 className="font-display text-4xl font-bold md:text-5xl">Выберите свой уровень</h2>
        </div>

        {loading ? (
          <div className="grid gap-8 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-96 w-full rounded-lg bg-secondary" />
            ))}
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative flex flex-col transition-all duration-500 ${
                  plan.featured
                    ? 'gold-border scale-105 bg-card shadow-2xl shadow-black/40'
                    : 'border-border bg-card hover:-translate-y-2'
                }`}
              >
                {plan.featured && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gold-gradient text-primary-foreground">
                    Популярный
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <h3 className="font-display text-3xl font-bold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                  <div className="mt-4">
                    <span className="font-display text-5xl font-bold text-gold">{plan.price}</span>
                    <span className="text-muted-foreground"> ₽/сут</span>
                  </div>
                </CardHeader>
                <Separator className="bg-border" />
                <CardContent className="flex-1 pt-6">
                  <ul className="space-y-4">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <Icon name="Check" size={18} className="text-gold" />
                        <span className="text-sm text-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full font-medium ${
                      plan.featured
                        ? 'gold-gradient text-primary-foreground hover:opacity-90'
                        : 'gold-border bg-transparent text-foreground hover:bg-secondary'
                    }`}
                    variant={plan.featured ? 'default' : 'outline'}
                  >
                    Выбрать тариф
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Pricing;
