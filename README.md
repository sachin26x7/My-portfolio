# 🚀 Sachin | MERN Full Stack Developer Portfolio (Fresher)

A modern, high-performance, single-page developer portfolio built with **React (Vite)**, **TypeScript**, and **Tailwind CSS**, with an **Express + MongoDB** backend for shared admin updates. Tailored for a **Fresher / Entry-Level MERN Full Stack Developer (0 Years Experience)** specializing in MongoDB, Express.js, React.js, and Node.js.

## Project Structure

```text
frontend/   React, Vite, TypeScript, and Tailwind UI
backend/    Express API, MongoDB connection, and authentication
```

---

## 🌟 Key Features

- ⚡ **Lightning Fast**: Built on modern Vite + React 18 for instantaneous loads and HMR.
- 🎨 **Sleek Aesthetic**: Near-black dark mode by default (`#07090e`), electric cyan accent (`#06b6d4`), subtle ambient gradient mesh, and glassmorphism.
- 🌓 **Theme Toggle**: Seamless dark and light mode toggle with state persistence.
- 🎯 **Hero Section**: Dynamic typing effect cycling through roles ("AI Developer", "Python Engineer", "ML Enthusiast"), live status badge, CTAs, and social links.
- 📊 **About & Counters**: Two-column layout with tech pillar cards and key metrics counters.
- 🛠️ **Categorized Skills**: Languages, AI/ML, Frameworks & Backends, Tools & MLOps with hover effects and skill levels.
- 💼 **Interactive Projects**: Filter by category (AI, ML, Web, Automation, All), featured badges, tech stack tags, live demo & GitHub links.
- ⏳ **Timeline**: Vertical chronological roadmap for professional experience and education.
- 📬 **Contact Section**: Responsive form with client-side validation, direct email copy button, and celebratory confetti.
- 🔐 **Owner Customization Studio (Protected)**:
  - **Only you can customize content after deployment!**
  - Protected with a secret Admin PIN (default: `1337`).
  - Access via the **Owner Studio** button in the navbar/footer or keyboard shortcut (`Alt + A`).
  - Modify profile details, add/edit/remove projects, adjust stat counters, change your PIN, save live changes, and export updated configuration JSON.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure the Backend

Copy `backend/.env.example` to `backend/.env` and add your MongoDB connection string, JWT secret, and admin PIN.
Copy `frontend/.env.example` to `frontend/.env`. For production, set `VITE_API_URL` to the deployed backend API URL, for example `https://your-api.example.com/api`.

### 3. Run Frontend and Backend Together
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

To run them separately, use `npm run dev:frontend` and `npm run dev:backend`.

### 4. Production Build
```bash
npm run build
```
Creates an optimized static bundle in `frontend/dist`.

---

## ✍️ How to Customize Everything

### Option 1: Edit the Code Directly (Static)
The frontend fallback content is centralized in:
👉 **[`frontend/src/data/portfolioData.ts`](./frontend/src/data/portfolioData.ts)**

Here you can customize:
- `name`, `title`, `tagline`, `typingRoles`
- `bio`, `location`, `avatarUrl`, `resumeUrl`, `email`
- `stats` (Years of experience, projects shipped, etc.)
- `socials` (GitHub, LinkedIn, Email)
- `skills` (Categories, names, skill levels)
- `projects` (Title, description, category, tags, demo URL, GitHub URL, thumbnail)
- `experiences` (Work and education history, bullets)
- `adminPin` (Your private password for live editing)

### Option 2: Live In-Browser Customization (Post-Deployment)
Once deployed on Vercel or any hosting platform:
1. Press **`Alt + A`** or click the **Owner Access** shield in the footer/navbar.
2. Enter your secret PIN (default: **`1337`**).
3. Update your projects, stats, bio, or contact info in the visual studio.
4. Click **"Save Live Changes"** to immediately update your view, or click **"Export Code"** to copy the updated JSON directly back to your repository.

---

## 🌐 Deploying to Vercel

1. Push this project to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of AI developer portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Vercel will automatically detect **Vite** with:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**! Your site is live in seconds.

---

## 📄 License
MIT License. Feel free to use and adapt this portfolio for your personal brand!
