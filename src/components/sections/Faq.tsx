import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { contentApi } from '@/lib/api';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  sort_order?: number;
}

const Faq = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    contentApi
      .list<FaqItem>('faqs')
      .then(setFaqs)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

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
          {loading ? (
            <div className="w-full space-y-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-14 w-full rounded-lg bg-card" />
              ))}
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.id} value={`faq-${i}`} className="mb-3 rounded-lg border border-border bg-card px-5">
                  <AccordionTrigger className="text-left font-display text-lg hover:text-gold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}

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
