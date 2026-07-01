import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const IMG_A =
  'https://cdn.poehali.dev/projects/10910bdc-8958-4092-a589-39bbc3cf96b8/files/288ceb98-69b6-44ca-b521-191376938449.jpg';
const IMG_B =
  'https://cdn.poehali.dev/projects/10910bdc-8958-4092-a589-39bbc3cf96b8/files/232e93f5-ee8f-4ff8-8f5c-459bf622b6fb.jpg';

const posts = [
  {
    img: IMG_A,
    category: 'Гайды',
    date: '28 июня 2026',
    title: 'Как выбрать авто для делового визита',
    text: 'Разбираем, какой класс автомобиля произведёт правильное впечатление на партнёров.',
  },
  {
    img: IMG_B,
    category: 'Путешествия',
    date: '21 июня 2026',
    title: 'Топ-5 маршрутов на выходные из Москвы',
    text: 'Живописные направления, которые лучше всего открывать за рулём премиум-авто.',
  },
  {
    img: IMG_A,
    category: 'Советы',
    date: '14 июня 2026',
    title: 'Всё о страховке при аренде',
    text: 'Какой пакет защиты выбрать и что важно знать перед подписанием договора.',
  },
];

const Blog = () => {
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

        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <Card
              key={post.title}
              className="group overflow-hidden border-border bg-card transition-all duration-500 hover:gold-border hover:-translate-y-2"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={post.img}
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
                  {post.date}
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
      </div>
    </section>
  );
};

export default Blog;
