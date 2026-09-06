# Bujhi

Responsive, interactive Next.js frontend for Bujhi, designed for deployment on Vercel.

## Included pages

- `/` — interactive homepage
- `/about` — Our Story
- `/login` — study-desk sign-in experience
- `/register` — rotatable classroom registration experience
- `/student/dashboard` — interactive student study desk

On the login demo, choose **Student**, enter any valid-looking email and a password of at least four characters, then select **Enter my study space**. The demo profile is kept only in that browser's local storage.

## Run locally

1. Install Node.js 20 or newer.
2. Open this folder in VS Code.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open `http://localhost:3000`.

## Deploy to Vercel

### Through GitHub

1. Create a GitHub repository and upload this project's files.
2. In Vercel, choose **Add New → Project**.
3. Import the repository.
4. Keep **Framework Preset: Next.js**.
5. Click **Deploy**.

### Through the Vercel CLI

1. Run `npm install -g vercel`.
2. Run `vercel` inside this project folder.
3. Follow the prompts.

No environment variables are required for this front-end version.

## Important

This is the frontend phase. Forms and controls demonstrate the complete interface, but there is no secure authentication or database yet. Teacher dashboard, real lessons, quizzes, user management, and owner editing belong to the backend/admin phases.
