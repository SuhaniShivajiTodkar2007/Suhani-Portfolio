# Full Stack Portfolio - Suhani Shivaji Todkar

Modern full-stack developer portfolio with a Vercel-hosted frontend and Render-hosted Node/Express API.

## Stack

- Frontend: HTML, CSS, Vanilla JavaScript
- Backend: Node.js, Express
- Database: MongoDB Atlas (Mongoose)
- Email: Nodemailer

## API

- `GET /api/health`
- `GET /api/projects`
- `POST /api/contact`

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example` and fill values.

3. Start server:

```bash
npm run dev
```

## Backend Deployment (Render)

1. Push this repo to GitHub.
2. On Render, create a new **Web Service** from the repo.
3. Use:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variables:
   - `PORT=5000`
   - `MONGO_URI=<your atlas uri>`
   - `CLIENT_URL=https://suhani-portfolio-tau.vercel.app`
   - `SERVE_FRONTEND=false`
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`
   - `OWNER_EMAIL=suhanitodkar16@gmail.com`
5. Deploy and verify:
   - `https://<your-render-service>.onrender.com/api/health`

## Frontend Deployment (Vercel)

- `vercel.json` is included so root deploy serves `client/` correctly.
- Set API base in `client/index.html`:

```html
<meta name="api-base" content="https://<your-render-service>.onrender.com" />
```

Then redeploy Vercel.
