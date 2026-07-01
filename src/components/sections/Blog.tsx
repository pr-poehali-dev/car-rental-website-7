import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Icon from '@/components/ui/icon';
import { contentApi } from '@/lib/api';

interface Post {
  id: number;
  title: string;
  category: string;
  text: string;
  image: string;
  published_at: string;
  is_published?: boolean;
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    contentApi
      .list<Post>('blog')
      .then((items) => setPosts(items.filter((p) => p.is_published !== false)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="blog" className="py-24">
      <div className="container">
        <div className="mb-14 flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Badge className="mb-4 gold-border bg-transparent px-4 py-1.5 text-xs uppercase tracking-widest text-gold">
              Блог
            </Badge>
            <h2 className="font-display text-4xl font-bold md:text-5xl">Полезные статьи</h2>
          </div>
          <Button variant="outline" className="gold-border bg-transparent text-foreground hover:bg-secondary">
            Все статьи
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>

        {loading ? (
          <div className="grid gap-8 md:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-80 w-full rounded-lg bg-secondary" />
            ))}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="group overflow-hidden border-border bg-card transition-all duration-500 hover:gold-border hover:-translate-y-2"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <Badge className="absolute left-4 top-4 gold-gradient text-primary-foreground">
                    {post.category}
                  </Badge>
                </div>
                <CardContent className="pt-5">
                  <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="Calendar" size={14} className="text-gold" />
                    {post.published_at}
                  </div>
                  <h3 className="mb-2 font-display text-2xl font-semibold leading-tight transition-colors group-hover:text-gold">
                    {post.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{post.text}</p>
                </CardContent>
                <CardFooter>
                  <a href="#" className="story-link flex items-center gap-1 text-sm font-medium text-gold">
                    Читать далее
                    <Icon name="ArrowRight" size={14} />
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
