# Abazeer — Saudi E-Commerce Frontend

<p align="center">
  <strong>A production e-commerce frontend built from scratch with React and TypeScript.</strong>
</p>

<p align="center">
  <a href="https://abazeer.sa/">Live Website</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TanStack_Query-5-FF4154?logo=reactquery&logoColor=white" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

---

## Overview

**Abazeer** is a Saudi e-commerce platform covering the complete customer shopping journey, from product discovery and search to cart, checkout, payment workflows, authentication, and account management.

I built the frontend from scratch using **React and TypeScript**, with a focus on reusable UI architecture, reliable API-driven state, responsive behavior, maintainability, and production-ready user flows.

### My contribution

- Built the complete customer-facing frontend from scratch.
- Implemented product discovery, search, filtering, and product-detail experiences.
- Built cart, wishlist, checkout, payment, authentication, and account workflows.
- Created reusable components and shared frontend patterns across the application.
- Integrated backend services through a structured REST API layer.
- Implemented consistent loading, error, empty, and asynchronous states.
- Delivered responsive experiences across desktop, tablet, and mobile.

---

## Key Product Flows

### Product discovery
- Category and product browsing
- Search
- Multi-criteria filtering
- Pagination
- Product details
- Availability and pricing states

### Shopping
- Cart management
- Wishlist
- Checkout flow
- Payment integration
- Order-related customer flows

### Customer account
- Authentication
- Registration and login flows
- Password and session-related states
- Account experiences

---

## Engineering Approach

### Server-state management

API-driven data is handled with **TanStack Query**, providing a consistent approach to:

- Fetching and caching
- Query lifecycle states
- Error handling
- Refetching and invalidation
- Keeping server data separate from local UI state

### API layer

The frontend uses **Axios** and a structured service layer to keep API communication separate from presentation logic.

### Reusable frontend architecture

The application is organized around reusable components, feature-level modules, shared hooks, typed data models, and common utilities to reduce duplication and make the codebase easier to extend.

### Forms and validation

Form-driven experiences use **React Hook Form** with schema-based validation where appropriate.

### Responsive UI

The interface is designed to support modern desktop, tablet, and mobile experiences with reusable Tailwind CSS patterns.

---

## Tech Stack

| Area | Technologies |
| --- | --- |
| Core | React, TypeScript, Vite |
| Server State | TanStack Query |
| API | Axios, REST APIs |
| Forms & Validation | React Hook Form, Zod |
| UI | Tailwind CSS, Radix UI |
| Routing | React Router |
| Internationalization | React i18next |
| Tooling | ESLint, TypeScript ESLint, Vite |

---

## Screenshots

### Home

<p align="center">
  <img src="https://github.com/user-attachments/assets/7f301dff-5e7c-453d-bb08-5eb51ce01e6a" width="100%" alt="Abazeer home page" />
</p>

### Product Listing

<p align="center">
  <img src="https://github.com/user-attachments/assets/2dc1d5be-bf7b-4b7a-92d9-bcd8fe8554f1" width="100%" alt="Abazeer product listing page" />
</p>

### Product Details

<p align="center">
  <img src="https://github.com/user-attachments/assets/8a09e69d-3759-4d1c-b4bc-f940b7c868a1" width="100%" alt="Abazeer product details page" />
</p>

### Authentication

<p align="center">
  <img src="https://github.com/user-attachments/assets/2b9a5b3f-b10c-437b-a052-7842abd1c9b6" width="100%" alt="Abazeer login page" />
</p>

### Mobile Experience

<p align="center">
  <img src="https://github.com/user-attachments/assets/91056a8d-2855-4ec8-b956-271867cbf971" width="35%" alt="Abazeer mobile home page" />
</p>

---

## Project Structure

```text
src/
├── common/       # Shared components and hooks
├── features/     # Feature-level modules
├── routes/       # Application routing
├── services/     # API layer
├── store/        # Client-side state
├── types/        # Shared TypeScript types
├── data/         # Static/constant data
├── lib/          # Package and application configuration
├── utils/        # Shared utilities
└── styles/       # Global styling
```

---

## What This Project Demonstrates

- End-to-end frontend ownership
- React + TypeScript production development
- API-heavy e-commerce workflows
- Reusable component architecture
- Server-state management with TanStack Query
- Responsive UI implementation
- Complex authenticated customer journeys
- Maintainable frontend structure for a growing product

---

## About Me

I'm **Maged Elshafey**, a Frontend Engineer focused on building production web applications with React, TypeScript, and Next.js.

- LinkedIn: https://www.linkedin.com/in/maged-elshafey/
- GitHub: https://github.com/magedElshafey
