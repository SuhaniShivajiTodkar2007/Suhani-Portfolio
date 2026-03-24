# Full Stack Portfolio - Suhani Shivaji Todkar

Modern full-stack developer portfolio built with HTML, CSS, JavaScript, Node.js, Express, and MongoDB.

## Tech Stack

- Frontend: HTML5, CSS3, Vanilla JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB Atlas + Mongoose
- Tools: Nodemailer, Dotenv

## Features

- Responsive, modern glassmorphism UI
- Dark mode toggle
- Scroll animations and interactive project cards
- Dynamic project loading from backend API
- Contact form that stores messages in MongoDB and sends email

## API Endpoints

- `GET /api/projects`
- `POST /api/contact`
- `GET /api/health`

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Configure `.env` with:

- `MONGO_URI`
- `CLIENT_URL`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`
- `OWNER_EMAIL`

3. Run server:

```bash
npm run dev
```

4. Open app:

- `http://localhost:5000`

## Deployment

- Frontend: Netlify or Vercel
- Backend: Render
- Database: MongoDB Atlas
