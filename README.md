# PostNest

API REST para e-commerce construida con NestJS, TypeScript y PostgreSQL.

## Características

- Gestión de productos
- Gestión de cupones
- Gestión de categorías
- Gestión de transacciones
- Validación de datos con class-validator
- Base de datos PostgreSQL con TypeORM
- Imágenes estáticas servidas

## Tecnologías

- **NestJS** - Framework de Node.js
- **TypeScript** - Tipado estático
- **PostgreSQL** - Base de datos relacional
- **TypeORM** - ORM para TypeScript
- **class-validator** - Validación de DTOs
- **class-transformer** - Transformación de datos

## Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd postnest

# Instalar dependencias
npm install
```

## Configuración

1. Copiar el archivo de ejemplo de variables de entorno:
```bash
cp .env.example .env
```

2. Configurar las variables de entorno en el archivo `.env`:
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASS=your_password
DATABASE_NAME=postnest
PORT=4000
```

3. Asegurarse de tener PostgreSQL instalado y corriendo

## Ejecución

```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run build
npm run start:prod

# Ejecutar seeders
npm run seed
```

## Scripts Disponibles

- `npm run build` - Compila el proyecto
- `npm run format` - Formatea el código con Prettier
- `npm run start` - Inicia la aplicación
- `npm run start:dev` - Inicia en modo watch
- `npm run start:debug` - Inicia en modo debug
- `npm run start:prod` - Inicia en modo producción
- `npm run lint` - Ejecuta ESLint
- `npm run test` - Ejecuta tests unitarios
- `npm run test:e2e` - Ejecuta tests e2e
- `npm run test:cov` - Ejecuta tests con cobertura
- `npm run seed` - Ejecuta los seeders

## Estructura del Proyecto

```
src/
├── categories/       # Módulo de categorías
├── common/           # Utilidades comunes
├── config/           # Configuración (TypeORM, etc)
├── coupons/          # Módulo de cupones
├── products/         # Módulo de productos
├── seeder/           # Seeders de base de datos
├── transactions/     # Módulo de transacciones
├── app.module.ts     # Módulo principal
└── main.ts           # Punto de entrada
```

## API Endpoints

La API corre por defecto en el puerto 4000.

### Productos
- `GET /products` - Listar productos
- `POST /products` - Crear producto
- `PUT /products/:id` - Actualizar producto
- `DELETE /products/:id` - Eliminar producto

### Cupones
- `GET /coupons` - Listar cupones
- `POST /coupons` - Crear cupón
- `PUT /coupons/:id` - Actualizar cupón
- `DELETE /coupons/:id` - Eliminar cupón

### Categorías
- `GET /categories` - Listar categorías
- `POST /categories` - Crear categoría
- `PUT /categories/:id` - Actualizar categoría
- `DELETE /categories/:id` - Eliminar categoría

### Transacciones
- `GET /transactions` - Listar transacciones
- `POST /transactions` - Crear transacción

## Licencia

UNLICENSED
