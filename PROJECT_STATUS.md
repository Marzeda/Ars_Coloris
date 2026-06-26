# PROJECT_STATUS.md

# Ars Coloris

Aplikacja internetowa prezentująca i zarządzająca autorskimi mozaikami artystycznymi Agnieszki Szelech.

---

# Aktualny status projektu

## Stan projektu

✅ Frontend działa lokalnie

✅ Backend działa lokalnie

✅ Logowanie działa

✅ Role użytkowników działają

✅ JWT działa

✅ Reset hasła działa

✅ Cloudinary skonfigurowane

✅ Zarządzanie produktami działa

✅ Upload zdjęć działa

✅ Panel administratora działa

✅ Panel artysty działa

---

# Technologie

## Frontend

* React
* React Router
* CSS
* Vercel (wdrożenie planowane/częściowo gotowe)

## Backend

* Node.js
* Express
* JWT
* bcryptjs
* Nodemailer
* Multer
* Cloudinary

## Przechowywanie danych

Obecnie:

* data/products.json
* data/users.json

Docelowo:

* MongoDB Atlas

---

# Role użytkowników

## Admin

Login:

admin

Uprawnienia:

* logowanie
* reset hasła
* dodawanie produktów
* edycja produktów
* usuwanie produktów
* zarządzanie zdjęciami
* przegląd użytkowników

## Artist

Login:

agnieszka

Uprawnienia:

* logowanie
* reset hasła
* dodawanie produktów
* edycja produktów
* usuwanie produktów
* zarządzanie zdjęciami

Brak dostępu do:

* listy użytkowników

---

# Bezpieczeństwo

## Logowanie

* hasła szyfrowane bcrypt
* JWT po zalogowaniu
* token przechowywany w localStorage

## Ochrona kont

* blokada po 3 błędnych próbach logowania
* blokada na 2 godziny
* zerowanie licznika po poprawnym logowaniu

## Reset hasła

* jednorazowy token resetu
* ważność 30 minut
* token usuwany po użyciu

---

# Cloudinary

Konto skonfigurowane.

Zmienne środowiskowe:

CLOUDINARY_CLOUD_NAME

CLOUDINARY_API_KEY

CLOUDINARY_API_SECRET

Nowe zdjęcia produktów są przechowywane w Cloudinary.

---

# JWT

Token zawiera:

* id
* username
* role

Ważność:

2 godziny

Endpointy chronione:

POST /api/products

PUT /api/products/:id

DELETE /api/products/:id

POST /api/products/:id/images

DELETE /api/products/:id/images

PUT /api/products/:id/main-image

GET /api/users

---

# Struktura projektu

## Frontend

pages/

* Home
* Gallery
* ProductDetails
* About
* Cooperation
* Contact
* Login
* Admin
* Artist
* ForgotPassword
* ResetPassword

components/

* Navbar
* Footer
* ProductForm
* ConfirmModal
* ProtectedRoute
* ScrollToTop
* ScrollToTopButton
* ImageModal

---

## Backend

server.js

mail.js

cloudinaryConfig.js

middleware JWT

data/

* products.json
* users.json

---

# Następne kroki

## Priorytet 1

Wdrożenie backendu na Render

* utworzenie konta Render
* deployment backendu
* konfiguracja zmiennych środowiskowych

## Priorytet 2

Połączenie Vercel + Render

* zmiana API_URL
* test logowania online
* test uploadu zdjęć online

## Priorytet 3

MongoDB Atlas

* migracja users.json
* migracja products.json

## Priorytet 4

Prawdziwa poczta email

* Gmail SMTP lub domena arscoloris.pl
* wysyłka linków resetu hasła

---

# Ostatni stabilny punkt

Wersja lokalna:

* JWT działa
* Cloudinary działa
* Admin działa
* Artist działa
* Upload zdjęć działa
* Reset hasła działa

Projekt gotowy do wdrożenia backendu online.
