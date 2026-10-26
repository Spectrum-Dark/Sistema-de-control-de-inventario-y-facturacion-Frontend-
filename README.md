# Sistema de repuestos

Interfaz web para el sistema de repuestos. Está construida con React y Vite, y se conecta a una API externa para obtener y guardar la información. Este repositorio contiene el frontend; el servidor de la API y su base de datos deben estar instalados y ejecutándose por separado.

## Requisitos

- Git, para clonar el proyecto.
- Node.js en una versión compatible con Vite 8 y npm (npm se instala junto con Node.js).
- La API del sistema ejecutándose y accesible desde la computadora donde se abrirá la aplicación.

## Instalación en otra computadora

1. Clona el repositorio y entra en la carpeta del proyecto:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd Sistema-de-repuestos
   ```

2. Instala las dependencias indicadas en `package-lock.json`:

   ```bash
   npm ci
   ```

3. Crea un archivo `.env` en la raíz del proyecto (al mismo nivel que `package.json`) con la dirección base de la API:

   ```dotenv
   VITE_API_URL=http://127.0.0.1:8000/api
   ```

   Cambia la dirección para que apunte al servidor de API que usarás. Por ejemplo, si la API corre en otra computadora de la red local:

   ```dotenv
   VITE_API_URL=http://192.168.1.50:8000/api
   ```

   Sustituye `192.168.1.1` por la IP real del equipo que ejecuta la API. Debe ser posible acceder a esa IP y puerto desde el navegador de la computadora cliente. Configura también el backend para permitir el origen del frontend (CORS).

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abre en el navegador la URL que muestre Vite en la terminal (normalmente `http://localhost:5173`). Para permitir el acceso desde otros equipos de la red, inicia Vite así:

   ```bash
   npm run dev -- --host 0.0.0.0
   ```

   Luego abre desde el otro equipo la dirección de red que Vite indique. La computadora cliente debe poder comunicarse tanto con Vite como con la API.

## Variables de entorno

`VITE_API_URL` es la URL base de la API, normalmente terminada en `/api`. Vite incorpora las variables con prefijo `VITE_` al frontend; por eso este archivo solo debe contener valores que puedan ser visibles en el navegador. No guardes contraseñas, claves privadas ni otros secretos aquí.

El archivo `.env` está excluido de Git. Cada persona debe crearlo en su computadora. Si cambias su contenido mientras Vite está ejecutándose, reinicia `npm run dev` para aplicar el cambio. Para una compilación de producción, define la URL de la API antes de ejecutar `npm run build`.

## Comandos disponibles

```bash
npm run dev      # Ejecuta el frontend en modo desarrollo
npm run build    # Genera la versión de producción en dist/
npm run preview  # Previsualiza localmente la compilación
npm run lint     # Revisa el código con ESLint
```

## Notas

- `npm ci` instala las versiones fijadas por `package-lock.json`; no es necesario copiar `node_modules` de otra computadora.
- `dist/` es generado por `npm run build` y no hace falta copiarlo para trabajar en modo desarrollo.
- Este repositorio no incluye el backend. Sin una API compatible y su base de datos, las pantallas que consultan o modifican datos no podrán completar esas operaciones.
