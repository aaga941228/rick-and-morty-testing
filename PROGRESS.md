# 🗺️ Hoja de Ruta del Proyecto: Rick & Morty Testing

Este archivo sirve para mantener el seguimiento del progreso del proyecto de aprendizaje de **Integration Testing** y **E2E Testing** con Vue 3, TypeScript, Vitest y Playwright.

## 🟩 Fase 1: Entorno y Configuración Inicial

- [x] Inicializar repositorio local y remoto en GitHub.
- [x] Configurar entorno de desarrollo con `npm create vue@latest`.
- [x] Integrar **TypeScript**, **ESLint** y **Prettier**.
- [x] Instalar y configurar **Tailwind CSS v4** (con PostCSS) y paleta de colores personalizada de Rick & Morty.
- [x] Instalar librería de iconos **Lucide Vue Next**.
- [x] Configurar archivo `.nvmrc` para fijar la versión de Node.js.

## 🟨 Fase 2: Autenticación y Vista de Login (Hecho y Testeado)

- [x] Crear el `authStore` con Pinia para gestionar la sesión del usuario.
- [x] Implementar la persistencia nativa en `localStorage` dentro del Store para soportar recargas (F5).
- [x] Crear el formulario de la vista `LoginView.vue` usando los componentes de iconos.
- [x] Integrar esquemas de **Zod** para validación avanzada de formatos (mínimo de caracteres).
- [x] Configurar los **Navigation Guards** bidireccionales en el Router (`src/router/index.ts`) para proteger rutas.
- [x] Resolver el bug de la pantalla en blanco mediante redirección explícita y coherencia en las rutas (`/login` y `/`).
- [x] **Integration Testing (Vitest + Vue Test Utils):**
  - [x] Test de renderizado inicial del Login.
  - [x] Tests de fallos de validación con Zod (Username y Password muy cortos) usando `vi.useFakeTimers()`.
  - [x] Test de credenciales incorrectas (Capa de lógica).
  - [x] Test de Login exitoso e integración espía con la acción del Store de Pinia.

## 🟧 Fase 3: Vista del Dashboard y Consumo de API (En Progreso)

- [x] Definir las interfaces de TypeScript para las respuestas de la API (`Character` y `APIResponse`).
- [x] Crear el servicio aislado `characterService.ts` resolviendo el bug del protocolo absoluto (`https://`).
- [x] Diseñar la maqueta lógica y visual de `DashboardView.vue` con estados de Carga, Error y Éxito (Grid de tarjetas).
- [ ] **Siguiente paso:** Crear la suite de pruebas de integración para el Dashboard (`DashboardView.spec.ts`).

## 🟦 Fase 4: Testing Avanzado y E2E (Pendiente)

- [ ] Implementar paginación o buscador en el Dashboard para añadir más interactividad.
- [ ] Testear la interacción del buscador y paginación en integración.
- [ ] Configurar e implementar pruebas **End-to-End (E2E)** con **Playwright** para validar el flujo completo del usuario en el navegador real.
