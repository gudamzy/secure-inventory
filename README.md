# Secure Inventory Management System

## Project Description
This project is a secure REST API-based inventory management system developed for Secure Software Development (IKB21503).

## Installation
npm install

## Run Application
node server.js

## Dependencies
- express
- mysql2
- bcryptjs
- express-session
- dotenv

## Security Features
- Password hashing using bcrypt
- Role-Based Access Control (RBAC)
- Session authentication
- SQL Injection prevention
- Audit logging

## API Endpoints
- POST /auth/register
- POST /auth/login
- GET /products
- POST /products
- PUT /products/:id
- DELETE /products/:id