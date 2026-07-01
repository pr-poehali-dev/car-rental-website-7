import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const steps = [
  {
    icon: 'MousePointerClick',
    title: 'Выберите авто',
    text: 'Подберите автомобиль по классу, цене и характеристикам в каталоге.',
  },
  {
    icon: 'CalendarCheck',
    title: 'Забронируйте',
    text: 'Укажите даты, город и оформите бронь онлайн за пару минут.',
  },
  {
    icon: 'FileSignature',
    title: 'Подпишите договор',
    text: 'Электронный договор и оплата удобным способом без бумажной волокиты.',
  },
  {
    icon: 'KeyRound',
    title: 'Получите ключи',
    text: 'Мы доставим авто в назначенное место — и можно отправляться в путь.',
  },
];

const HowItWorks = () => {
  return (
    <section id="how" className="py-24 bg-secondary/30 noise-bg">
      <div className="container">
        <div className="mb-14 text-center">
          <Badge className="mb-4 gold-border bg-transparent px-4 py-1.5 text-xs uppercase tracking-widest text-gold">
            Как это работает
          </Badge>
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            Аренда в 4 простых шага
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="relative text-center">
              <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full gold-border bg-card">
                <Icon name={step.icon} size={30} className="text-gold" />
                <span className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full gold-gradient font-display text-lg font-bold text-primary-foreground">
                  {i + 1}
                </span>
              </div>
              <h3 className="mb-2 font-display text-2xl font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              {i < steps.length - 1 && (
                <Icon
                  name="ChevronRight"
                  size={24}
                  className="absolute -right-4 top-8 hidden text-gold/30 lg:block"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
