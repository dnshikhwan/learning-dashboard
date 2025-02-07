-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS credits_id_seq;

-- Table Definition
CREATE TABLE "public"."credits" (
    "id" int4 NOT NULL DEFAULT nextval('credits_id_seq'::regclass),
    "user_id" int4,
    "credit" int4 DEFAULT 0,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "credits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS goals_id_seq;

-- Table Definition
CREATE TABLE "public"."goals" (
    "id" int4 NOT NULL DEFAULT nextval('goals_id_seq'::regclass),
    "skill_id" int4,
    "user_id" int4,
    "description" text NOT NULL,
    "target_date" timestamp NOT NULL,
    "status" varchar(20) NOT NULL,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "goals_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE CASCADE,
    CONSTRAINT "goals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS progress_id_seq;

-- Table Definition
CREATE TABLE "public"."progress" (
    "id" int4 NOT NULL DEFAULT nextval('progress_id_seq'::regclass),
    "skill_id" int4,
    "user_id" int4,
    "date" timestamp DEFAULT CURRENT_TIMESTAMP,
    "time_spent" int4 NOT NULL,
    "notes" text,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "progress_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE CASCADE,
    CONSTRAINT "progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS reset_tokens_id_seq;

-- Table Definition
CREATE TABLE "public"."reset_tokens" (
    "id" int4 NOT NULL DEFAULT nextval('reset_tokens_id_seq'::regclass),
    "user_id" int4,
    "token" varchar(255) NOT NULL,
    "expires_at" timestamp NOT NULL DEFAULT (now() + '00:10:00'::interval),
    CONSTRAINT "reset_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS resources_id_seq;

-- Table Definition
CREATE TABLE "public"."resources" (
    "id" int4 NOT NULL DEFAULT nextval('resources_id_seq'::regclass),
    "skill_id" int4,
    "user_id" int4,
    "title" varchar(200) NOT NULL,
    "url" varchar(500) NOT NULL,
    "type" varchar(50) NOT NULL,
    "status" varchar(20) NOT NULL,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "resources_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE CASCADE,
    CONSTRAINT "resources_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS rewards_id_seq;

-- Table Definition
CREATE TABLE "public"."rewards" (
    "id" int4 NOT NULL DEFAULT nextval('rewards_id_seq'::regclass),
    "name" varchar(200) NOT NULL,
    "imagesrc" varchar(200),
    "credit" int4 NOT NULL DEFAULT 0,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS skills_id_seq;

-- Table Definition
CREATE TABLE "public"."skills" (
    "id" int4 NOT NULL DEFAULT nextval('skills_id_seq'::regclass),
    "user_id" int4,
    "name" varchar(100) NOT NULL,
    "description" text,
    "target_date" timestamp NOT NULL,
    "status" varchar(20) NOT NULL,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "skills_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS streaks_id_seq;

-- Table Definition
CREATE TABLE "public"."streaks" (
    "id" int4 NOT NULL DEFAULT nextval('streaks_id_seq'::regclass),
    "user_id" int4,
    "current_streak" int4 DEFAULT 0,
    "last_activity_date" timestamp,
    "longest_streak" int4 DEFAULT 0,
    CONSTRAINT "streaks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "username" varchar(50),
    "email" varchar(100),
    "password_hash" varchar(255) NOT NULL,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);


-- Indices
CREATE UNIQUE INDEX username_unique ON public.users USING btree (username)
CREATE UNIQUE INDEX email_unique ON public.users USING btree (email);

-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_rewards_id_seq;

-- Table Definition
CREATE TABLE "public"."users_rewards" (
    "id" int4 NOT NULL DEFAULT nextval('users_rewards_id_seq'::regclass),
    "user_id" int4,
    "reward_id" int4,
    "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_rewards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE,
    CONSTRAINT "users_rewards_reward_id_fkey" FOREIGN KEY ("reward_id") REFERENCES "public"."rewards"("id") ON DELETE CASCADE,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."credits" ("id", "user_id", "credit", "created_at", "updated_at") VALUES
(1, 5, 95, '2025-02-06 13:31:10.0019', '2025-02-06 13:31:10.0019');


INSERT INTO "public"."goals" ("id", "skill_id", "user_id", "description", "target_date", "status", "created_at", "updated_at") VALUES
(7, 9, 5, 'learn about function', '2025-02-16 00:00:00', 'To Do', '2025-02-04 20:53:05.181316', '2025-02-04 20:53:05.181316');
INSERT INTO "public"."goals" ("id", "skill_id", "user_id", "description", "target_date", "status", "created_at", "updated_at") VALUES
(8, 9, 5, 'learning loops and conditional', '2025-02-06 00:00:00', 'To Do', '2025-02-04 21:12:15.870731', '2025-02-04 21:12:15.870731');
INSERT INTO "public"."goals" ("id", "skill_id", "user_id", "description", "target_date", "status", "created_at", "updated_at") VALUES
(9, 10, 5, 'Learning useEffect updated', '2025-02-06 00:00:00', 'To Do', '2025-02-04 21:14:37.270778', '2025-02-04 21:14:37.270778');

INSERT INTO "public"."progress" ("id", "skill_id", "user_id", "date", "time_spent", "notes", "created_at", "updated_at") VALUES
(7, 9, 5, '2025-02-05 00:00:00', 10, 'learn about function updated', '2025-02-05 17:29:06.533772', '2025-02-05 17:29:06.533772');
INSERT INTO "public"."progress" ("id", "skill_id", "user_id", "date", "time_spent", "notes", "created_at", "updated_at") VALUES
(8, 9, 5, '2025-02-04 00:00:00', 50, 'Test edited', '2025-02-06 12:25:27.939751', '2025-02-06 12:25:27.939751');
INSERT INTO "public"."progress" ("id", "skill_id", "user_id", "date", "time_spent", "notes", "created_at", "updated_at") VALUES
(9, 10, 5, '2025-02-06 00:00:00', 60, 'test', '2025-02-06 13:04:34.257247', '2025-02-06 13:04:34.257247');
INSERT INTO "public"."progress" ("id", "skill_id", "user_id", "date", "time_spent", "notes", "created_at", "updated_at") VALUES
(10, 9, 5, '2025-02-06 00:00:00', 10, 'credit testing', '2025-02-06 16:00:38.980514', '2025-02-06 16:00:38.980514'),
(13, 10, 5, '2025-02-07 00:00:00', 13, 'test header streak
', '2025-02-07 02:13:07.80912', '2025-02-07 02:13:07.80912');

INSERT INTO "public"."reset_tokens" ("id", "user_id", "token", "expires_at") VALUES
(4, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbmlzaGlraHduMDNAZ21haWwuY29tIiwiaWF0IjoxNzM4NTAwNzgzLCJleHAiOjE3Mzg1MDEzODN9.PS5OSoswr-oMEypoMaiTKuJ4G4mhwVymD24FWAYuCMM', '2025-02-02 16:03:03.645594');
INSERT INTO "public"."reset_tokens" ("id", "user_id", "token", "expires_at") VALUES
(5, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbmlzaGlraHduMDNAZ21haWwuY29tIiwiaWF0IjoxNzM4NTAyMDA3LCJleHAiOjE3Mzg1MDI2MDd9.DaBw7jLxEM9WH72SyrkDJjW3mM0lk16cRssxP_Ye1cE', '2025-02-02 16:23:27.272543');
INSERT INTO "public"."reset_tokens" ("id", "user_id", "token", "expires_at") VALUES
(6, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbmlzaGlraHduMDNAZ21haWwuY29tIiwiaWF0IjoxNzM4NTAyNTA1LCJleHAiOjE3Mzg1MDMxMDV9.szPWSIbim0Ewgo2m2Mu8q6YXJyILxjhyDMX1Yrgtqqw', '2025-02-02 16:31:45.811825');
INSERT INTO "public"."reset_tokens" ("id", "user_id", "token", "expires_at") VALUES
(7, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbmlzaGlraHduMDNAZ21haWwuY29tIiwiaWF0IjoxNzM4NTAyNjEyLCJleHAiOjE3Mzg1MDMyMTJ9.9lk1wnwMKW7j9k1vybBRdrPhN3pdiwy4Fm8u-P767UA', '2025-02-02 16:33:32.313272');

INSERT INTO "public"."resources" ("id", "skill_id", "user_id", "title", "url", "type", "status", "created_at", "updated_at") VALUES
(2, 10, 5, 'test updated', 'google.com', 'article', 'To Do', '2025-02-03 19:39:02.25273', '2025-02-03 19:39:02.25273');
INSERT INTO "public"."resources" ("id", "skill_id", "user_id", "title", "url", "type", "status", "created_at", "updated_at") VALUES
(5, 9, 5, 'test', 'google.com', 'video', 'To Do', '2025-02-04 17:48:50.461569', '2025-02-04 17:48:50.461569');


INSERT INTO "public"."rewards" ("id", "name", "imagesrc", "credit", "created_at", "updated_at") VALUES
(1, 'React e-book', 'https://m.media-amazon.com/images/I/61PHsZByB3L._UF1000,1000_QL80_.jpg', 100, '2025-02-06 16:57:26.810422', '2025-02-06 16:57:26.810422');
INSERT INTO "public"."rewards" ("id", "name", "imagesrc", "credit", "created_at", "updated_at") VALUES
(2, 'Python E-book', 'https://images-na.ssl-images-amazon.com/images/I/51CxdWNJ%2BOL.jpg', 10, '2025-02-06 20:12:43.227086', '2025-02-06 20:12:43.227086');


INSERT INTO "public"."skills" ("id", "user_id", "name", "description", "target_date", "status", "created_at", "updated_at") VALUES
(10, 5, 'React', 'Learning react', '2025-02-27 00:00:00', 'In Progress', '2025-02-03 22:41:18.968501', '2025-02-03 22:41:18.968501');
INSERT INTO "public"."skills" ("id", "user_id", "name", "description", "target_date", "status", "created_at", "updated_at") VALUES
(9, 5, 'Python updated', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius in lacus id aliquet. Vestibulum porta elementum commodo. Nullam ornare, ligula in vestibulum accumsan, felis sem egestas enim, porta mattis erat justo vel velit. Nullam euismod, tellus vitae consequat tincidunt, dolor neque sollicitudin eros, eget imperdiet enim augue sed risus. Nunc ullamcorper nisi leo, a consequat quam imperdiet non. Duis bibendum dolor est, in malesuada quam consequat non. Etiam ac neque nec est sagittis pulvinar. Cras at risus dignissim, tristique eros vitae, suscipit nisi. Nulla ut sollicitudin erat, sit amet ultrices sem. Integer et massa venenatis, placerat ex ac, sodales metus.

Aenean risus ligula, fermentum et purus at, gravida vestibulum dolor. In congue, nunc sodales facilisis tincidunt, lorem velit finibus quam, et vestibulum ligula libero laoreet sapien. Donec id neque quis nisl sollicitudin commodo sed nec nisi. Nullam ut ullamcorper augue, in malesuada leo. Donec rhoncus enim ante, vel convallis nisi rhoncus pharetra. Maecenas eget feugiat mi, in sagittis est. Duis ornare imperdiet suscipit. Curabitur volutpat ante sem, vitae suscipit est dignissim ac. Phasellus sit amet fringilla risus, at maximus nulla. Nunc hendrerit vulputate imperdiet. Nunc vel sem quam. Aliquam at cursus ante.', '2025-02-16 00:00:00', 'Completed', '2025-02-03 01:31:06.516912', '2025-02-03 01:31:06.516912');


INSERT INTO "public"."streaks" ("id", "user_id", "current_streak", "last_activity_date", "longest_streak") VALUES
(1, 5, 2, '2025-02-07 02:13:07.813', 2);


INSERT INTO "public"."users" ("id", "username", "email", "password_hash", "created_at", "updated_at") VALUES
(4, 'danish', 'danish@gmail.com', '$2b$10$3qh2..DGscke.0cG1qzVLu8W1Hfv9KSwtr/KdKH9oHO7J/BWrrqQi', '2025-02-02 01:02:36.164439', '2025-02-02 01:02:36.164439');
INSERT INTO "public"."users" ("id", "username", "email", "password_hash", "created_at", "updated_at") VALUES
(5, 'F1eEkZ', 'danishikhwn03@gmail.com', '$2b$10$4kvGX0yV.MRFFSxleyx1ou0vVtEgL.pxHOqa782gXhV2jdiMx2NHG', '2025-02-02 01:16:33.922868', '2025-02-02 01:16:33.922868');


INSERT INTO "public"."users_rewards" ("id", "user_id", "reward_id", "created_at", "updated_at") VALUES
(5, 5, 2, '2025-02-06 20:27:42.805111', '2025-02-06 20:27:42.805111');

