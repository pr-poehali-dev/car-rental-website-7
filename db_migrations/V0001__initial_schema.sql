CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_sessions_token ON sessions(token);

CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    car_class VARCHAR(100) NOT NULL,
    price_per_day INTEGER NOT NULL,
    year INTEGER NOT NULL,
    power INTEGER NOT NULL,
    transmission VARCHAR(50) NOT NULL,
    fuel VARCHAR(50) NOT NULL,
    seats INTEGER NOT NULL,
    rating NUMERIC(2,1) DEFAULT 5.0,
    reviews INTEGER DEFAULT 0,
    image TEXT,
    badge VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE advantages (
    id SERIAL PRIMARY KEY,
    icon VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
);

CREATE TABLE pricing_plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    features JSONB DEFAULT '[]',
    featured BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    text TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE conditions (
    id SERIAL PRIMARY KEY,
    icon VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
);

CREATE TABLE insurance_packages (
    id SERIAL PRIMARY KEY,
    key VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    price VARCHAR(100) NOT NULL,
    items JSONB DEFAULT '[]',
    sort_order INTEGER DEFAULT 0
);

CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    text TEXT NOT NULL,
    image TEXT,
    published_at DATE DEFAULT CURRENT_DATE,
    is_published BOOLEAN DEFAULT TRUE
);

CREATE TABLE faqs (
    id SERIAL PRIMARY KEY,
    question VARCHAR(500) NOT NULL,
    answer TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
);

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    message TEXT,
    car_id INTEGER REFERENCES cars(id),
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);