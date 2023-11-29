# Proyecto NOC

El objetivo es crear una serie de tareas usando Arquitectura Limpia con TypeScript

# Dev

1. Clonar el archivo env.template a .env
2. Configurar las variables de entorno

```
PORT=3000
MAILER_SERVICE=gmail
MAILER_MAIL=
MAILER_MAIL_SECRET_KEY=
PROD=false

MONGO_DB_URL=
MONGO_DB_NAME=
MONGO_DB_USER=
MONGO_DB_PASS=

POSTGRES_URL=
POSTGRES_USER=
POSTGRES_PASS=
POSTGRES_DB=
```

3. Levantar las bases de datos

```
docker compose up -d
```

3. Ejecutar el comando `yarn` or `npm install`
4. Ejecutar el comando `yarn dev` or `npm run dev`
