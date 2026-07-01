import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const ABOUT_IMG =
  'https://cdn.poehali.dev/projects/10910bdc-8958-4092-a589-39bbc3cf96b8/files/232e93f5-ee8f-4ff8-8f5c-459bf622b6fb.jpg';

const skills = [
  { label: 'Довольные клиенты', value: 98 },
  { label: 'Повторные аренды', value: 87 },
  { label: 'Доставка вовремя', value: 99 },
];

const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="container grid items-center gap-16 lg:grid-cols-2">
        <div className="relative">
          <div className="absolute -inset-4 radial-glow" />
          <img
            src={ABOUT_IMG}
            alt="Шоурум AURUM"
            className="relative rounded-lg gold-border object-cover shadow-2xl"
          />
          <Card className="glass gold-border absolute -bottom-8 -right-4 hidden p-5 md:block">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-sm gold-gradient">
                <Icon name="Award" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-gold">15+</div>
                <div className="text-xs text-muted-foreground">лет безупречной работы</div>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Badge className="mb-4 gold-border bg-transparent px-4 py-1.5 text-xs uppercase tracking-widest text-gold">
            О сервисе
          </Badge>
          <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
            Мы создаём опыт, а не просто <span className="gold-text-gradient">аренду</span>
          </h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            AURUM — это премиальный сервис аренды автомобилей класса люкс. Каждая машина
            проходит детейлинг перед выдачей, а персональный менеджер сопровождает вас на
            всех этапах — от выбора до возврата.
          </p>

          <div className="mt-8 space-y-5">
            {skills.map((s) => (
              <div key={s.label}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-medium text-gold">{s.value}%</span>
                </div>
                <Progress value={s.value} className="h-2 bg-secondary [&>div]:bg-gold" />
              </div>
            ))}
          </div>

          <Button
            size="lg"
            className="mt-8 gold-gradient font-medium text-primary-foreground hover:opacity-90"
          >
            Узнать больше о нас
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;
