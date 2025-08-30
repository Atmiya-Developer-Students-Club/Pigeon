# 🕊️ Pigeon — Simple Mailing Microservice

**Pigeon** is a lightweight, secure, and efficient mailing microservice built with Express.js and Nodemailer. It supports bulk and single email sending with batching, API key protection, and easy integration for any backend or event-driven workflow.

---

## 📑 Table of Contents

1. [Overview](#-overview)
2. [Tech Stack](#-tech-stack)
3. [Packages & Libraries](#-packages--libraries)
4. [Getting Started](#-getting-started)
5. [Setup](#-setup)
6. [Features](#-features)
7. [API Reference](#-api-reference)
8. [Demo & Screenshots](#-demo--screenshots)
9. [Acknowledgments](#-acknowledgments)
10. [License](#-license)

---

## 🌟 Overview

Pigeon provides a simple REST API for sending emails in bulk or individually. It is designed for reliability, scalability, and security, making it ideal for notifications, newsletters, and transactional email use cases.

---

## 🧠 Tech Stack

| Layer        | Tech         |
|--------------|--------------|
| Language     | TypeScript   |
| Framework    | Express.js   |
| Mailer       | Nodemailer   |
| Docs         | Swagger UI   |
| Package Tool | Bun / npm    |
| Editor       | VS Code      |

---

## 📦 Packages & Libraries

- [Express.js](https://expressjs.com/)
- [Nodemailer](https://nodemailer.com/)
- [Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express)
- [dotenv](https://www.npmjs.com/package/dotenv)

---

## 🚀 Getting Started

> Prerequisites:
- Node.js or Bun
- Git
- VS Code

---

## ⚙️ Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Atmiya-Developer-Students-Club/Pigeon.git
   ```
2. Navigate into the project:
   ```bash
   cd pigeon
   ```
3. Install dependencies:
   ```bash
   bun install # or npm install
   ```
4. Copy `.env.example` to `.env` and fill in your SMTP and API key settings.
5. Start the service:
   ```bash
   bun run index.ts # or npm start
   ```
6. Visit Swagger API docs at [http://localhost:3001/api-docs](http://localhost:3001/api-docs)

---

## 🎯 Features

* 📧 Send bulk emails with batching (configurable batch size & delay)
* 📩 Send single emails with the same API
* 🔑 API key protection for all endpoints
* 📝 Swagger UI for interactive API docs
* 🪵 Request and error logging
* ⚡ Simple, fast, and production-ready

---

## 📚 API Reference

### Authentication
All endpoints require an `Authorization: Bearer <API_KEY>` header.

### POST `/bulk`
Send emails to multiple recipients in batches.

**Request Body:**
```json
{
  "subject": "Hello!",
  "html": "<b>Welcome!</b>",
  "recipients": ["user1@example.com", "user2@example.com"]
}
```

**Response:**
```json
{
  "success": true,
  "sent": 2,
  "failed": 0
}
```

### POST `/single`
Send an email to a single recipient.

**Request Body:**
```json
{
  "subject": "Hi!",
  "html": "<b>Just you!</b>",
  "recipients": ["user@example.com"]
}
```

**Response:**
```json
{
  "success": true,
  "sent": 1,
  "failed": 0
}
```

### API Docs
Visit [http://localhost:3001/api-docs](http://localhost:3001/api-docs) for full Swagger documentation and live testing.

---

## 📸 Demo & Screenshots

*To be added.*

---

## 🙏 Acknowledgments

* [Nodemailer Docs](https://nodemailer.com/about/)
* [Express.js Docs](https://expressjs.com/)
* [Swagger UI](https://swagger.io/tools/swagger-ui/)

---

## 📜 License

This project is licensed under the **MIT License**.

---

> **Pigeon** – Reliable, secure, and simple email delivery for your apps.
