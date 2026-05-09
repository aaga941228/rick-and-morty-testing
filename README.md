# Rick & Morty: Dashboard Testing 🧬

This project is a web application built with **Vue 3** and **TypeScript**, specifically designed to practice and demonstrate **Integration Testing** and **End-to-End (E2E) Testing** strategies.

## 🎯 Project Purpose

The main goal is to learn how to test the interactions between different modules in a real-world application:

- **Integration:** Testing the relationship between components, global state (Pinia), and navigation (Vue Router).
- **E2E:** Validating complete user flows (Login -> Dashboard -> Details) within a real browser environment.

## 🚀 Features

- **Mock Authentication:** Login flow for protected access.
- **Character Explorer:** Consuming the [Rick and Morty API](https://rickandmortyapi.com).
- **Filters & Pagination:** Searching and navigating through characters.
- **Protected Routes:** Access management based on authentication state.

## 🛠 Tech Stack

- **Framework:** Vue 3 (Composition API + Script Setup)
- **Language:** TypeScript
- **State Management:** Pinia
- **Routing:** Vue Router
- **Testing (Unit/Integration):** Vitest + Vue Test Utils
- **Testing (E2E):** Playwright
- **Linting & Formatting:** ESLint + Prettier

## 🧪 Testing Roadmap

1. **Auth Flow:** Validate that login saves user data and redirects correctly.
2. **Data Fetching:** Verify API data rendering and handling of loading/error states.
3. **Navigation Guard:** Ensure unauthenticated users are redirected from the Dashboard.
4. **Interaction:** Test that search filters correctly update the character list.

---

_Learning to build robust applications through the art of testing._
