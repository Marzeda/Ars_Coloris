# PROJECT_STATUS.md

# Ars Coloris

Internetowa aplikacja prezentująca oraz umożliwiająca zarządzanie autorskimi mozaikami artystycznymi Agnieszki Szelech.

---

# Status projektu

## Aktualny stan

✅ Frontend działa poprawnie

✅ Backend działa poprawnie

✅ MongoDB Atlas działa

✅ Cloudinary działa

✅ Logowanie działa

✅ Role użytkowników działają

✅ JWT działa

✅ Reset hasła działa

✅ CRUD produktów działa

✅ Zarządzanie zdjęciami działa

✅ Panel Administratora działa

✅ Panel Artysty działa

Projekt jest stabilny i gotowy do wdrożenia środowiska produkcyjnego.

---

# Technologie

## Frontend

- React
- React Router
- CSS
- Axios

Planowane wdrożenie:

- Vercel

---

## Backend

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- Nodemailer
- Multer
- Cloudinary

Planowane wdrożenie:

- Render

---

# Baza danych

## MongoDB Atlas

Produkty są przechowywane w MongoDB.

Model Product obejmuje między innymi:

- legacyId
- name
- category
- price
- availability
- deliveryTime
- description
- images
- isFeatured
- isPublished
- displayOrder
- createdAt
- updatedAt

Do zachowania numeracji produktów wykorzystywany jest model Counter.

---

# Cloudinary

Zdjęcia produktów są przechowywane w Cloudinary.

Obsługiwane funkcje:

- upload zdjęć
- usuwanie pojedynczego zdjęcia
- ustawianie zdjęcia głównego
- automatyczne usuwanie zdjęć podczas usuwania produktu

---

# Autoryzacja

## JWT

Token zawiera:

- id
- username
- role

Czas ważności:

2 godziny

Chronione endpointy:

- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id
- POST /api/products/:id/images
- DELETE /api/products/:id/images
- PUT /api/products/:id/main-image
- GET /api/users

---

# Role użytkowników

## Administrator

Uprawnienia:

- logowanie
- reset hasła
- dodawanie produktów
- edycja produktów
- usuwanie produktów
- zarządzanie zdjęciami
- przegląd użytkowników

---

## Artist

Uprawnienia:

- logowanie
- reset hasła
- dodawanie produktów
- edycja produktów
- usuwanie produktów
- zarządzanie zdjęciami

Brak dostępu do:

- listy użytkowników

---

# Bezpieczeństwo

## Logowanie

- hasła szyfrowane bcrypt
- JWT
- middleware autoryzacji
- middleware ról użytkowników

## Reset hasła

- jednorazowy token resetu
- ważność 30 minut
- automatyczne usunięcie tokenu po wykorzystaniu

---

# Struktura backendu

```
config/
controllers/
middleware/
models/
routes/
scripts/
utils/

server.js
cloudinaryConfig.js
mail.js
```

Kontrolery:

- authController
- productController
- productImageController

Modele:

- Product
- Counter

---

# Struktura frontendu

```
components/
pages/
hooks/
utils/
services/
```

Najważniejsze komponenty:

- Navbar
- Footer
- ProductForm
- ImageModal
- ConfirmModal
- ProtectedRoute
- ScrollToTop

Najważniejsze strony:

- Home
- Gallery
- ProductDetails
- About
- Cooperation
- Contact
- Login
- Admin
- Artist
- ForgotPassword
- ResetPassword

---

# Zrealizowane etapy

✅ JWT

✅ Role użytkowników

✅ Reset hasła

✅ MongoDB Atlas

✅ Mongoose

✅ Migracja produktów z JSON do MongoDB

✅ Cloudinary

✅ CRUD produktów

✅ Zarządzanie zdjęciami

✅ Liczniki legacyId

✅ Refaktoryzacja kontrolerów

---

# Aktualna architektura

```
Frontend (React)
        │
        ▼
Express API
        │
        ├── JWT
        ├── Middleware
        ├── Controllers
        ├── Routes
        ├── Mongoose
        │
        ├── MongoDB Atlas
        └── Cloudinary
```

---

# Kolejne etapy

## Etap 1

Refaktoryzacja projektu

- uporządkowanie katalogów
- wydzielenie wspólnych funkcji
- globalny middleware błędów
- walidacja danych
- ujednolicenie odpowiedzi API

---

## Etap 2

Migracja użytkowników do MongoDB

- usunięcie users.json
- model User
- pełna obsługa użytkowników przez Mongoose

---

## Etap 3

Deployment

Backend:

- Render

Frontend:

- Vercel

Konfiguracja:

- MongoDB Atlas
- Cloudinary
- zmienne środowiskowe

---

## Etap 4

Jakość projektu

- Docker
- GitHub Actions
- automatyczne testy
- backup danych
- monitoring

---

# Ostatni stabilny punkt

Backend:

✅ MongoDB Atlas

✅ CRUD produktów

✅ Cloudinary

✅ JWT

✅ Reset hasła

✅ Role użytkowników

Frontend:

✅ Panel Administratora

✅ Panel Artysty

✅ Galeria produktów

✅ Zarządzanie zdjęciami

Projekt znajduje się na etapie stabilizacji po zakończonej migracji produktów do MongoDB i jest gotowy do kolejnych prac refaktoryzacyjnych oraz przygotowania do wdrożenia produkcyjnego.