export type FieldType = 'text' | 'textarea' | 'number' | 'boolean' | 'json' | 'select';

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  hideInTable?: boolean;
  readOnly?: boolean;
}

export interface SectionConfig {
  key: string;
  title: string;
  icon: string;
  fields: FieldConfig[];
  editable: boolean;
}

export const adminSections: SectionConfig[] = [
  {
    key: 'cars',
    title: 'Автомобили',
    icon: 'Car',
    editable: true,
    fields: [
      { key: 'name', label: 'Модель', type: 'text' },
      { key: 'brand', label: 'Марка', type: 'text' },
      { key: 'car_class', label: 'Класс', type: 'select', options: ['Люкс', 'Бизнес', 'Спорт', 'Внедорожник'] },
      { key: 'price_per_day', label: 'Цена/сутки', type: 'number' },
      { key: 'year', label: 'Год', type: 'number' },
      { key: 'power', label: 'Мощность', type: 'number', hideInTable: true },
      { key: 'transmission', label: 'КПП', type: 'text', hideInTable: true },
      { key: 'fuel', label: 'Топливо', type: 'text', hideInTable: true },
      { key: 'seats', label: 'Мест', type: 'number', hideInTable: true },
      { key: 'rating', label: 'Рейтинг', type: 'number', hideInTable: true },
      { key: 'reviews', label: 'Отзывов', type: 'number', hideInTable: true },
      { key: 'image', label: 'Фото (URL)', type: 'text', hideInTable: true },
      { key: 'badge', label: 'Бейдж', type: 'text' },
      { key: 'is_active', label: 'Активен', type: 'boolean' },
    ],
  },
  {
    key: 'advantages',
    title: 'Преимущества',
    icon: 'Sparkles',
    editable: true,
    fields: [
      { key: 'icon', label: 'Иконка', type: 'text' },
      { key: 'title', label: 'Заголовок', type: 'text' },
      { key: 'text', label: 'Текст', type: 'textarea' },
      { key: 'sort_order', label: 'Порядок', type: 'number' },
    ],
  },
  {
    key: 'pricing',
    title: 'Тарифы',
    icon: 'CreditCard',
    editable: true,
    fields: [
      { key: 'name', label: 'Название', type: 'text' },
      { key: 'price', label: 'Цена', type: 'text' },
      { key: 'description', label: 'Описание', type: 'text' },
      { key: 'features', label: 'Опции (по строкам)', type: 'json', hideInTable: true },
      { key: 'featured', label: 'Популярный', type: 'boolean' },
      { key: 'sort_order', label: 'Порядок', type: 'number' },
    ],
  },
  {
    key: 'reviews',
    title: 'Отзывы',
    icon: 'Star',
    editable: true,
    fields: [
      { key: 'name', label: 'Имя', type: 'text' },
      { key: 'role', label: 'Должность', type: 'text' },
      { key: 'text', label: 'Отзыв', type: 'textarea' },
      { key: 'rating', label: 'Оценка', type: 'number' },
      { key: 'is_published', label: 'Опубликован', type: 'boolean' },
    ],
  },
  {
    key: 'conditions',
    title: 'Условия',
    icon: 'FileText',
    editable: true,
    fields: [
      { key: 'icon', label: 'Иконка', type: 'text' },
      { key: 'title', label: 'Заголовок', type: 'text' },
      { key: 'text', label: 'Текст', type: 'textarea' },
      { key: 'sort_order', label: 'Порядок', type: 'number' },
    ],
  },
  {
    key: 'insurance',
    title: 'Страховка',
    icon: 'ShieldCheck',
    editable: true,
    fields: [
      { key: 'key', label: 'Ключ', type: 'text' },
      { key: 'name', label: 'Название', type: 'text' },
      { key: 'price', label: 'Цена', type: 'text' },
      { key: 'items', label: 'Пункты (по строкам)', type: 'json', hideInTable: true },
      { key: 'sort_order', label: 'Порядок', type: 'number' },
    ],
  },
  {
    key: 'blog',
    title: 'Блог',
    icon: 'Newspaper',
    editable: true,
    fields: [
      { key: 'title', label: 'Заголовок', type: 'text' },
      { key: 'category', label: 'Категория', type: 'text' },
      { key: 'text', label: 'Текст', type: 'textarea' },
      { key: 'image', label: 'Фото (URL)', type: 'text', hideInTable: true },
      { key: 'published_at', label: 'Дата', type: 'text' },
      { key: 'is_published', label: 'Опубликован', type: 'boolean' },
    ],
  },
  {
    key: 'faqs',
    title: 'FAQ',
    icon: 'CircleHelp',
    editable: true,
    fields: [
      { key: 'question', label: 'Вопрос', type: 'text' },
      { key: 'answer', label: 'Ответ', type: 'textarea' },
      { key: 'sort_order', label: 'Порядок', type: 'number' },
    ],
  },
  {
    key: 'bookings',
    title: 'Заявки',
    icon: 'Inbox',
    editable: true,
    fields: [
      { key: 'name', label: 'Имя', type: 'text' },
      { key: 'phone', label: 'Телефон', type: 'text' },
      { key: 'message', label: 'Сообщение', type: 'textarea' },
      { key: 'car_id', label: 'ID авто', type: 'number', hideInTable: true },
      { key: 'status', label: 'Статус', type: 'select', options: ['new', 'processing', 'confirmed', 'done', 'cancelled'] },
    ],
  },
  {
    key: 'users',
    title: 'Пользователи',
    icon: 'Users',
    editable: true,
    fields: [
      { key: 'name', label: 'Имя', type: 'text' },
      { key: 'email', label: 'Email', type: 'text', readOnly: true },
      { key: 'role', label: 'Роль', type: 'select', options: ['user', 'admin'] },
      { key: 'phone', label: 'Телефон', type: 'text' },
    ],
  },
];
