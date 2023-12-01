  <p align="center">
    <a href="https://www.typescriptlang.org/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/512px-Typescript_logo_2020.svg.png" width="50" alt="TypeScript Logo" /></a>
    <a href="https://www.mongodb.com/" target="blank"><img src="https://seeklogo.com/images/M/mongodb-logo-D13D67C930-seeklogo.com.png" width="50" alt="MongoDb Logo" /></a>
    <a href="https://www.postgresql.org/" target="blank"><img src="https://www.postgresql.org/media/img/about/press/elephant.png" width="50" alt="Postgres Logo" /></a>
    <a href="https://www.docker.com/" target="blank"><img src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/97_Docker_logo_logos-512.png" width="50" alt="docker Logo" /></a>
    <a href="https://www.prisma.io/" target="blank"><img src="https://prismalens.vercel.app/header/logo-dark.svg" width="150" alt="Prisma Logo" /></a>
  </p>

# Proyecto NOC - Sistema de monitoreo

El objetivo es crear un servicio que pueda monitorear una Api si este están ejecutandose o no, se puede implementar en otras proyectos parecidos.

- Registro de logs con niveles de severidad: low, medium o high
- Registro de logs en el sistema de archivos
- Registro de logs en una base de datos
- Aplicando Arquitectura limppia

# Dev

1. Clonar el archivo `env.template` a `.env`
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

4. Ejecutar el siguiente comando para migrar el Schema de Prisma

```
npx prisma migrate dev
```

5. Ejecutar el comando `yarn` or `npm install`
6. Ejecutar el comando `yarn dev` or `npm run dev`
