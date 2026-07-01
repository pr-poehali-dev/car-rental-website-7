import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const IMG_A =
  'https://cdn.poehali.dev/projects/10910bdc-8958-4092-a589-39bbc3cf96b8/files/288ceb98-69b6-44ca-b521-191376938449.jpg';
const IMG_B =
  'https://cdn.poehali.dev/projects/10910bdc-8958-4092-a589-39bbc3cf96b8/files/232e93f5-ee8f-4ff8-8f5c-459bf622b6fb.jpg';

const gallery = [
  { img: IMG_A, span: 'md:col-span-2 md:row-span-2', title: 'Mercedes S-Class' },
  { img: IMG_B, span: '', title: 'Porsche Panamera' },
  { img: IMG_A, span: '', title: 'Bentley Continental' },
  { img: IMG_B, span: 'md:col-span-2', title: 'Range Rover' },
  { img: IMG_A, span: '', title: 'BMW 7 Series' },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-24">
      <div className="container">
        <div className="mb-14 text-center">
          <Badge className="mb-4 gold-border bg-transparent px-4 py-1.5 text-xs uppercase tracking-widest text-gold">
            Галерея
          </Badge>
          <h2 className="font-display text-4xl font-bold md:text-5xl">Наш автопарк</h2>
        </div>

        <div className="grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4">
          {gallery.map((item, i) => (
            <Dialog key={i}>
              <DialogTrigger asChild>
                <div
                  className={`group relative cursor-pointer overflow-hidden rounded-lg gold-border ${item.span}`}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="p-5">
                      <span className="font-display text-xl font-semibold">{item.title}</span>
                      <div className="mt-1 flex items-center gap-1 text-sm text-gold">
                        <Icon name="ZoomIn" size={14} />
                        Открыть
                      </div>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-3xl border-border bg-card p-2">
                <img src={item.img} alt={item.title} className="w-full rounded-md" />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
