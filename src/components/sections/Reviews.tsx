import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Icon from '@/components/ui/icon';
import { contentApi } from '@/lib/api';

interface Review {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  is_published?: boolean;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    contentApi
      .list<Review>('reviews')
      .then((items) => setReviews(items.filter((r) => r.is_published !== false)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="reviews" className="py-24">
      <div className="container">
        <div className="mb-14 text-center">
          <Badge className="mb-4 gold-border bg-transparent px-4 py-1.5 text-xs uppercase tracking-widest text-gold">
            Отзывы
          </Badge>
          <h2 className="font-display text-4xl font-bold md:text-5xl">Что говорят клиенты</h2>
        </div>

        {loading ? (
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-lg bg-secondary" />
            ))}
          </div>
        ) : (
          <Carousel opts={{ align: 'start', loop: true }} className="mx-auto max-w-6xl">
            <CarouselContent>
              {reviews.map((r) => (
                <CarouselItem key={r.id} className="md:basis-1/2 lg:basis-1/3">
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
        )}
      </div>
    </section>
  );
};

export default Reviews;
