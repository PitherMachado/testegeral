-- N1NEGOCIOSV2 - EXCLUSIVE DATABASE SCHEMA
-- For PostgreSQL or MySQL

CREATE TABLE company_settings (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) DEFAULT 'N1 NEGÓCIOS V2',
    slogan TEXT,
    logo_url TEXT,
    primary_color_h INT,
    primary_color_s INT,
    primary_color_l INT,
    theme VARCHAR(10) DEFAULT 'dark'
);

CREATE TABLE roles (
    role_id INT PRIMARY KEY,
    name VARCHAR(50)
);

INSERT INTO roles VALUES (1, 'Admin'), (2, 'Gerente'), (3, 'Supervisor'), (4, 'Aluno'), (5, 'Suporte');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password_hash TEXT,
    role_id INT REFERENCES roles(role_id)
);

CREATE TABLE modules (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    icon VARCHAR(10),
    order_index INT
);

CREATE TABLE lessons (
    id VARCHAR(50) PRIMARY KEY,
    module_id VARCHAR(50) REFERENCES modules(id),
    title VARCHAR(255),
    video_url TEXT,
    duration VARCHAR(50),
    order_index INT
);

CREATE TABLE user_progress (
    user_id INT REFERENCES users(id),
    lesson_id VARCHAR(50) REFERENCES lessons(id),
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, lesson_id)
);
