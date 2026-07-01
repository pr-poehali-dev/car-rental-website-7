import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const CTA_IMG =
  'https://cdn.poehali.dev/projects/10910bdc-8958-4092-a589-39bbc3cf96b8/files/288ceb98-69b6-44ca-b521-191376938449.jpg';

const CtaBanner = () => {
  return (
    <section className="py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl gold-border">
          <img src={CTA_IMG} alt="Забронировать авто" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
          <div className="relative z-10 px-8 py-20 md:px-16 md:py-24">
            <div className="max-w-xl">
              <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
                Готовы к <span className="gold-text-gradient">незабываемой</span> поездке?
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">
                Забронируйте автомобиль мечты прямо сейчас и получите скидку 10% на первую аренду.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="gold-gradient px-8 text-base font-medium text-primary-foreground hover:opacity-90"
                >
                  Забронировать сейчас
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gold-border bg-transparent px-8 text-base text-foreground hover:bg-secondary"
                >
                  <Icon name="Phone" size={18} className="mr-2" />
                  +7 (495) 000-00-00
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
