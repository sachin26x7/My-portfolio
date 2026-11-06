# Netlify deployment

The frontend is a Vite single-page app. Netlify uses the root `netlify.toml` to
build from `frontend/`, publish `frontend/dist/`, and route client-side paths to
`index.html`.

## Deploy the frontend

1. Import the repository in Netlify and deploy with the detected `netlify.toml`.
2. Set the Netlify environment variable `VITE_API_URL` to the public origin of
   the separately hosted Express API (for example, `https://api.example.com`).
   Do not add `/api`; the app appends API routes itself.
3. Trigger a new deploy so Vite includes the API URL in the frontend build.

The frontend can render its bundled portfolio data without the API, but the
owner login and shared portfolio updates require a reachable API.

## Configure the API host

Deploy `backend/` as a Node.js service and provide its required environment
variables: `MONGO_URI`, `JWT_SECRET`, and `ADMIN_PIN`. Set `FRONTEND_URL` to the
deployed Netlify site origin (for example, `https://your-site.netlify.app`) so
the API accepts browser requests from the site. Update this value if the
Netlify domain changes.

The contact form submits directly to FormSubmit and does not depend on the
portfolio API.
