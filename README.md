# Full Stack Portfolio - Suhani Shivaji Todkar

Production-ready portfolio website with modern UI, smooth UX, and backend APIs using MVC architecture.

## Tech Stack

- Frontend: HTML5, CSS3, Vanilla JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB Atlas + Mongoose
- Integrations: Nodemailer, Dotenv, GitHub API

## Project Structure

```text
portfolio
|-- client
|   |-- index.html
|   |-- css/style.css
|   |-- js/script.js
|   |-- assets/images
|   `-- assets/icons
|-- server
|   |-- config/db.js
|   |-- models/Project.js
|   |-- models/Message.js
|   |-- controllers/projectController.js
|   |-- controllers/contactController.js
|   |-- routes/projectRoutes.js
|   |-- routes/contactRoutes.js
|   |-- utils/sendEmail.js
|   `-- server.js
|-- .env
|-- package.json
`-- README.md
```

## Features

- Mobile-first responsive design
- Glassmorphism cards, gradient visuals, and smooth animations
- Dark mode / light mode toggle with localStorage persistence
- Smooth scrolling + active navbar section highlighting
- Scroll reveal animations
- Animated skill progress bars
- Dynamic project loading from backend (`GET /api/projects`)
- Contact form with MongoDB save + email delivery (`POST /api/contact`)
- GitHub API integration for latest repositories
- SEO-friendly metadata and semantic sectioning

## API Endpoints

- `GET /api/projects`
- `POST /api/contact`
- `GET /api/health`

### Contact Request Body

```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "message": "Hello from the portfolio form"
}
```

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Configure `.env`:

- `MONGO_URI`: MongoDB Atlas connection string
- `CLIENT_URL`: comma-separated allowed frontend origins
- `SMTP_*`: SMTP provider credentials
- `OWNER_EMAIL`: where contact notifications should be sent

3. Run the backend:

```bash
npm run dev
```

4. Open frontend:

- Option A: Use Express static serving at `http://localhost:5000`
- Option B: Serve `client/` separately (Live Server, Netlify, Vercel)
- If separate, set `<meta name="api-base">` in `client/index.html` to your backend URL

## Deployment

### Backend on Render

1. Create a new Web Service using this repository.
2. Build command: `npm install`
3. Start command: `npm start`
4. Add environment variables from `.env`:
   - `PORT`
   - `MONGO_URI`
   - `CLIENT_URL`
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`
   - `OWNER_EMAIL`

### Database on MongoDB Atlas

1. Create cluster and database user.
2. Whitelist Render IPs or allow network access as needed.
3. Copy Atlas URI into `MONGO_URI`.

### Frontend on Netlify or Vercel

1. Deploy `client/` as static site.
2. Set API base in `client/index.html`:
   - `<meta name="api-base" content="https://your-backend.onrender.com">`
3. Update backend `CLIENT_URL` with deployed frontend domain.

## Notes

- Server seeds default portfolio projects on first startup if collection is empty.
- GitHub repositories are fetched from `script.js` via `GITHUB_USERNAME`; update this constant with your actual GitHub username.
