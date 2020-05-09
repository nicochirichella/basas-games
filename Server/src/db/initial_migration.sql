CREATE TABLE "public"."juego" (
   "id" bigserial NOT NULL,
   "name" varchar(150) NOT NULL,
   "created_at" timestamp without time zone DEFAULT now() NOT NULL,
   "updated_at" timestamp without time zone DEFAULT now() NOT NULL,
   "deleted_at" timestamp,
   PRIMARY KEY ("id")
);

CREATE table jugador (
   id bigserial not null,
   name varchar(150) NOT NULL,
   mail varchar(150) NOT NULL,
   PRIMARY KEY ("id")
);


CREATE table partido (
  id bigserial not null,
  juego_id bigint not null,
  ganador_id bigint null,
  created_at timestamp without time zone DEFAULT now() NOT NULL,
  updated_at timestamp without time zone DEFAULT now() NOT NULL,
  deleted_at timestamp,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("juego_id") REFERENCES "public"."juego" ("id") ON UPDATE RESTRICT ON DELETE RESTRICT,
  FOREIGN KEY ("ganador_id") REFERENCES "public"."jugador" ("id") ON UPDATE RESTRICT ON DELETE RESTRICT
);

create table mazo (
  id bigserial not null,
  nombre varchar(150),
  PRIMARY KEY ("id")
);

CREATE table carta (
   id bigserial not null,
   numero integer not null,
   palo varchar(150),
   mazo_id bigint not null,
   PRIMARY KEY ("id"),
   FOREIGN KEY ("mazo_id") REFERENCES "public"."mazo" ("id") ON UPDATE RESTRICT ON DELETE RESTRICT
);