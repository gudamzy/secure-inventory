# Secure Inventory System

## Project Description

This project is a secure web-based inventory management system developed for the Secure Software Development (IKB21503) course.

The system includes:

- Secure Authentication
- Role-Based Access Control (RBAC)
- Audit Logging
- Protected Routes
- Session Management
- OWASP-based Secure Coding Practices

---

## Installation

```bash
npm install
```

---

## Run Backend Server

```bash
node server.js
```

---

## Run Frontend

```bash
cd frontend
npm start
```

---

## Dependencies

- express
- mysql2
- bcryptjs
- express-session
- dotenv
- helmet
- react
- react-router-dom

---

## Security Features

- Password hashing using bcrypt
- Role-Based Access Control (RBAC)
- Session authentication
- SQL Injection prevention
- Audit logging
- Protected routes
- Input validation
- OWASP ZAP testing

---

## API Endpoints

### Authentication

- POST /auth/register
- POST /auth/login
- POST /auth/logout

### Products

- GET /products
- POST /products
- PUT /products/:id
- DELETE /products/:id

---

## Screenshots

### Login Page

(Add screenshot here)

### Dashboard

(Add screenshot here)

### Products Page

(Add screenshot here)

---

## Author

Developed for Secure Software Development (IKB21503)