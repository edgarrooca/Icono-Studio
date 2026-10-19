<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Icono Studio

## Trabajar desde otro ordenador

1. Clona `https://github.com/edgarrooca/Icono-Studio.git` con GitHub Desktop.
2. Instala Node.js (versión 22 recomendada).
3. Abre una terminal en la carpeta del proyecto y ejecuta `npm ci`.
4. Ejecuta `npm run dev` y abre la dirección que indique Vite.

Para verlo desde otro dispositivo en la misma Wi-Fi, utiliza la dirección
`Network` que aparece en la terminal, no `localhost`.

Las claves privadas no se guardan en GitHub. Si necesitas funciones de pago o
integraciones, copia `.env.example` a `.env.local` y configura tus propias claves.
No necesitas una clave de Gemini para visualizar y editar las páginas.

Comprobaciones: `npm run lint` y `npm run build` (incluye prerenderizado SEO).

## Información del proyecto original

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/77a03ff3-2b62-45bc-98b7-b8ea537a6e85

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Only if using Gemini features, set `GEMINI_API_KEY` in a local `.env.local` file.
3. Run the app:
   `npm run dev`
