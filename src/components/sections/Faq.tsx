import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const faqs = [
  {
    q: 'За сколько времени нужно бронировать авто?',
    a: 'Рекомендуем бронировать за 1–2 дня. Но чаще всего мы можем подать автомобиль уже через 2–3 часа после заявки.',
  },
  {
    q: 'Есть ли ограничение по пробегу?',
    a: 'На тарифах «Премиум» и «VIP» пробег безлимитный. На тарифе «Стандарт» — 200 км в сутки, далее 30 ₽ за км.',
  },
  {
    q: 'Как происходит оплата?',
    a: 'Оплатить можно банковской картой онлайн, переводом или наличными при получении. Депозит блокируется на карте.',
  },
  {
    q: 'Можно ли арендовать авто с водителем?',
    a: 'Да, на тарифе VIP доступна услуга личного водителя. Также её можно подключить к любому тарифу за доплату.',
  },
  {
    q: 'Что входит в доставку автомобиля?',
    a: 'Доставка в пределах города — бесплатно. Привезём авто к дому, в офис, аэропорт или отель в удобное время.',
  },
  {
    q: 'Как работает личный кабинет?',
    a: 'В личном кабинете вы управляете бронированиями, отслеживаете статус доставки, храните документы и копите бонусы.',
  },
];

const Faq = () => {
  return (
    <section id="faq" className="py-24 bg-secondary/30 noise-bg">
      <div className="container">
        <div className="mb-14 text-center">
          <Badge className="mb-4 gold-border bg-transparent px-4 py-1.5 text-xs uppercase tracking-widest text-gold">
            FAQ
          </Badge>
          <h2 className="font-display text-4xl font-bold md:text-5xl">Частые вопросы</h2>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="mb-3 rounded-lg border border-border bg-card px-5">
                <AccordionTrigger className="text-left font-display text-lg hover:text-gold hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-lg gold-border bg-card p-8 text-center">
            <Icon name="MessagesSquare" size={32} className="text-gold" />
            <p className="text-muted-foreground">Не нашли ответ на свой вопрос?</p>
            <Button className="gold-gradient font-medium text-primary-foreground hover:opacity-90">
              Задать вопрос менеджеру
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
