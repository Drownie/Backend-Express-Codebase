-- Active: 1697634182584@@127.0.0.1@5434@mamonDB

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(100) NOT NULL UNIQUE,
    hash VARCHAR(255) NOT NULL,
    external_id VARCHAR(255) UNIQUE,
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    created_timestamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_timestamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM users;

DROP TABLE IF EXISTS transactions;

CREATE TABLE transactions (
    transaction_id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL, 
    previous_balance DOUBLE PRECISION NOT NULL DEFAULT 0,
    transaction_amount DOUBLE PRECISION NOT NULL DEFAULT 0,
    current_balance DOUBLE PRECISION NOT NULL DEFAULT 0,
    transaction_type VARCHAR(100) NOT NULL,
    category_type VARCHAR(100) NOT NULL,
    icon_url VARCHAR(100) NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    created_timestamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_timestamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
);

DROP TABLE IF EXISTS user_data;

CREATE TABLE user_data (
    user_data_id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE, 
    balance DOUBLE PRECISION NOT NULL DEFAULT 0,
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    created_timestamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_timestamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
);