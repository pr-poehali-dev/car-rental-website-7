import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const BookingBar = () => {
  const [date, setDate] = useState<Date | undefined>();
  const { toast } = useToast();

  return (
    <section id="booking" className="relative z-20 -mt-16">
      <div className="container">
        <Card className="glass gold-border grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-5 lg:items-end">
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Город получения
            </Label>
            <Select defaultValue="msk">
              <SelectTrigger className="border-border bg-background/60">
                <Icon name="MapPin" size={16} className="mr-2 text-gold" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="msk">Москва</SelectItem>
                <SelectItem value="spb">Санкт-Петербург</SelectItem>
                <SelectItem value="sochi">Сочи</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Класс авто
            </Label>
            <Select defaultValue="any">
              <SelectTrigger className="border-border bg-background/60">
                <Icon name="Car" size={16} className="mr-2 text-gold" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Любой</SelectItem>
                <SelectItem value="lux">Люкс</SelectItem>
                <SelectItem value="business">Бизнес</SelectItem>
                <SelectItem value="sport">Спорт</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Дата
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start border-border bg-background/60 font-normal"
                >
                  <Icon name="Calendar" size={16} className="mr-2 text-gold" />
                  {date ? date.toLocaleDateString('ru-RU') : 'Выберите'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Срок, дней
            </Label>
            <Input
              type="number"
              defaultValue={3}
              min={1}
              className="border-border bg-background/60"
            />
          </div>

          <Button
            className="gold-gradient h-10 font-medium text-primary-foreground hover:opacity-90"
            onClick={() =>
              toast({
                title: 'Идёт поиск',
                description: 'Подбираем доступные автомобили по вашим параметрам.',
              })
            }
          >
            <Icon name="Search" size={16} className="mr-2" />
            Найти авто
          </Button>
        </Card>
      </div>
    </section>
  );
};

export default BookingBar;
