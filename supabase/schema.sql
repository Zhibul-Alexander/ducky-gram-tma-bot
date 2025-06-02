CREATE TABLE users
(
    id          UUID PRIMARY KEY         DEFAULT uuid_generate_v4(),
    telegram_id TEXT UNIQUE NOT NULL,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    balance     NUMERIC                  DEFAULT 0,
    language    TEXT                     DEFAULT 'en',
    theme       TEXT                     DEFAULT 'light'
);

CREATE TABLE tasks
(
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title       TEXT    NOT NULL,
    description TEXT    NOT NULL,
    reward      NUMERIC NOT NULL,
    image_url   TEXT
);

CREATE TABLE user_tasks
(
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id      UUID REFERENCES users (id) NOT NULL,
    task_id      UUID REFERENCES tasks (id) NOT NULL,
    completed    BOOLEAN          DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE (user_id, task_id)
);