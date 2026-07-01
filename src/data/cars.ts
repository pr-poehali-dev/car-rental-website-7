export interface Car {
  id: number;
  name: string;
  brand: string;
  class: string;
  pricePerDay: number;
  year: number;
  power: number;
  transmission: string;
  fuel: string;
  seats: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
}

export const cars: Car[] = [
  {
    id: 1,
    name: 'S-Class Coupe',
    brand: 'Mercedes-Benz',
    class: 'Люкс',
    pricePerDay: 24900,
    year: 2024,
    power: 496,
    transmission: 'Автомат',
    fuel: 'Бензин',
    seats: 4,
    rating: 5.0,
    reviews: 128,
    image: 'https://cdn.poehali.dev/projects/10910bdc-8958-4092-a589-39bbc3cf96b8/files/288ceb98-69b6-44ca-b521-191376938449.jpg',
    badge: 'Хит',
  },
  {
    id: 2,
    name: 'Panamera Turbo',
    brand: 'Porsche',
    class: 'Спорт',
    pricePerDay: 32900,
    year: 2024,
    power: 630,
    transmission: 'Автомат',
    fuel: 'Бензин',
    seats: 4,
    rating: 4.9,
    reviews: 96,
    image: 'https://cdn.poehali.dev/projects/10910bdc-8958-4092-a589-39bbc3cf96b8/files/232e93f5-ee8f-4ff8-8f5c-459bf622b6fb.jpg',
    badge: 'Новинка',
  },
  {
    id: 3,
    name: '7 Series',
    brand: 'BMW',
    class: 'Бизнес',
    pricePerDay: 21500,
    year: 2023,
    power: 380,
    transmission: 'Автомат',
    fuel: 'Гибрид',
    seats: 5,
    rating: 4.8,
    reviews: 74,
    image: 'https://cdn.poehali.dev/projects/10910bdc-8958-4092-a589-39bbc3cf96b8/files/288ceb98-69b6-44ca-b521-191376938449.jpg',
  },
  {
    id: 4,
    name: 'Range Rover Autobiography',
    brand: 'Land Rover',
    class: 'Внедорожник',
    pricePerDay: 27800,
    year: 2024,
    power: 530,
    transmission: 'Автомат',
    fuel: 'Бензин',
    seats: 5,
    rating: 4.9,
    reviews: 112,
    image: 'https://cdn.poehali.dev/projects/10910bdc-8958-4092-a589-39bbc3cf96b8/files/232e93f5-ee8f-4ff8-8f5c-459bf622b6fb.jpg',
    badge: 'Премиум',
  },
  {
    id: 5,
    name: 'Continental GT',
    brand: 'Bentley',
    class: 'Люкс',
    pricePerDay: 49900,
    year: 2024,
    power: 659,
    transmission: 'Автомат',
    fuel: 'Бензин',
    seats: 4,
    rating: 5.0,
    reviews: 58,
    image: 'https://cdn.poehali.dev/projects/10910bdc-8958-4092-a589-39bbc3cf96b8/files/288ceb98-69b6-44ca-b521-191376938449.jpg',
    badge: 'Топ',
  },
  {
    id: 6,
    name: 'Ghibli',
    brand: 'Maserati',
    class: 'Спорт',
    pricePerDay: 29500,
    year: 2023,
    power: 430,
    transmission: 'Автомат',
    fuel: 'Бензин',
    seats: 5,
    rating: 4.7,
    reviews: 63,
    image: 'https://cdn.poehali.dev/projects/10910bdc-8958-4092-a589-39bbc3cf96b8/files/232e93f5-ee8f-4ff8-8f5c-459bf622b6fb.jpg',
  },
];

export const carClasses = ['Все', 'Люкс', 'Бизнес', 'Спорт', 'Внедорожник'];
