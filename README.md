# Tienda de Libros - Frontend

Aplicación web en React + TypeScript que consume la API de [Tienda de Libros (backend)](../backend) para mostrar y administrar libros y autores.

## Tecnologías

- React 19 + TypeScript
- Vite
- React Router (rutas con lazy loading por página)
- Axios (consumo de la API)
- TailwindCSS (estilos)

## Estructura

```
src/
  api/                      -> Cliente HTTP base (Axios)
  modules/
    books/                  -> Tipos, servicio, páginas y componentes de Libros
    authors/                -> Tipos, servicio, páginas y componentes de Autores
    shared/                 -> Componentes reutilizables (Navbar, Spinner, Pagination)
  App.tsx                   -> Rutas de la aplicación
```

## Requisitos previos

- [Node.js 20+](https://nodejs.org/)
- El backend de Tienda de Libros corriendo (ver su propio README)

## Instalación y ejecución

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Configurar la URL del backend en `.env` (ya viene con un valor por defecto):

   ```
   VITE_API_BASE_URL=http://localhost:5139
   ```

3. Levantar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abrir `http://localhost:5173`.

> Si el backend corre en otro puerto u origen, hay que agregarlo también a `Cors:AllowedOrigins` en el `appsettings.json` del backend para que el navegador no bloquee las peticiones.

## Páginas

- **Libros** (`/books`): listado paginado (10 por página), con alta, edición y eliminación.
- **Detalle de libro** (`/books/:id`): información del libro y su autor relacionado.
- **Autores** (`/authors`): listado de autores agrupado por nombre, mostrando cuántos libros tiene publicados cada uno, con alta, edición y eliminación.

## Build de producción

```bash
npm run build
```
