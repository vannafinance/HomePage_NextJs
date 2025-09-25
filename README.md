# HomePage_NextJs

This is a Next.js project. Before running the application, you need to set up your environment variables.

## Environment Variables

This project requires the following environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_API_KEY`
- `NEXT_SUPABASE_USER_EMAIL`
- `NEXT_SUPABASE_USER_PASSWORD`
- `NEXT_GALAXE_ACCESSTOKEN`

### Setup

1. **Copy the example environment file:**

```bash
cp .env.example .env
Open .env and fill in your credentials.
Make sure not to push your .env file to GitHub as it contains sensitive information.

Install dependencies:

bash
Copy code
npm install
Run the development server:

bash
Copy code
npm run dev
The app should now be running at http://localhost:3000.

Notes
.env.example contains all the required keys but no real secrets.

.env is ignored in Git to keep your credentials safe.

Make sure you have Node.js installed (recommend version 18+).

Folder Structure
app/ – main Next.js app

components/ – React components

lib/ – utility functions

public/ – static assets

next.config.ts – Next.js configuration

tsconfig.json – TypeScript config

postcss.config.mjs – PostCSS config

eslint.config.mjs – ESLint config

