CREATE TABLE IF NOT EXISTS t_p95696998_auto_service_website.requests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    car_brand VARCHAR(100),
    car_model VARCHAR(200),
    selected_works TEXT,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p95696998_auto_service_website.admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO t_p95696998_auto_service_website.admins (username, password_hash)
VALUES ('admin', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lewdBpU4HuB0p0rSW')
ON CONFLICT (username) DO NOTHING;
