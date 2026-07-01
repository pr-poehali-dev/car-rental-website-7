import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const contacts = [
  { icon: 'MapPin', title: 'Адрес', value: 'Москва, Пресненская наб., 12' },
  { icon: 'Phone', title: 'Телефон', value: '+7 (495) 000-00-00' },
  { icon: 'Mail', title: 'Почта', value: 'hello@aurum-rent.ru' },
  { icon: 'Clock', title: 'Режим работы', value: 'Ежедневно, 24/7' },
];

const Contacts = () => {
  const { toast } = useToast();

  return (
    <section className="py-24 noise-bg">
      <div className="container">
        <div className="mb-14 text-center">
          <Badge className="mb-4 gold-border bg-transparent px-4 py-1.5 text-xs uppercase tracking-widest text-gold">
            Контакты
          </Badge>
          <h2 className="font-display text-4xl font-bold md:text-5xl">Свяжитесь с нами</h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="grid gap-5 sm:grid-cols-2">
            {contacts.map((c) => (
              <Card key={c.title} className="border-border bg-card transition-colors hover:gold-border">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-sm gold-gradient">
                    <Icon name={c.icon} size={22} className="text-primary-foreground" />
                  </div>
                  <div className="text-sm text-muted-foreground">{c.title}</div>
                  <div className="mt-1 font-display text-xl font-semibold">{c.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="gold-border bg-card">
            <CardContent className="pt-6">
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  toast({
                    title: 'Заявка отправлена!',
                    description: 'Наш менеджер свяжется с вами в течение 15 минут.',
                  });
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" placeholder="Ваше имя" className="border-border bg-background" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" placeholder="+7 (___) ___-__-__" className="border-border bg-background" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="msg">Сообщение</Label>
                  <Textarea
                    id="msg"
                    placeholder="Какой автомобиль вас интересует?"
                    className="min-h-32 border-border bg-background"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full gold-gradient font-medium text-primary-foreground hover:opacity-90"
                >
                  Отправить заявку
                  <Icon name="Send" size={16} className="ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
