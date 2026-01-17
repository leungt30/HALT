# Deployment Guide (Vercel)

## Overview
This monorepo contains two deployable projects:
1.  **Frontend**: Vite + React application.
2.  **Backend**: Express + Node.js API (Serverless).

## Part 1: Vercel Project Setup (One-Time)

You need to create two separate projects in Vercel, one for each component.

### 1. Backend Project
1.  Go to Vercel Dashboard -> **Add New...** -> **Project**.
2.  Import the `HALT` repository.
3.  **Project Name**: `halt-backend` (or similar).
4.  **Framework Preset**: Other.
5.  **Root Directory**: Click "Edit" and select `backend`.
6.  **Build Command**: `npm run build` (or leave default if it detects `vercel build`).
7.  **Output Directory**: `dist` (or default).
8.  **Environment Variables**:
    - None currently required (unless you add DB credentials later).
9.  Click **Deploy**.

**Take note of the Backend URL** assigned (e.g., `https://halt-backend.vercel.app`).

### 2. Frontend Project
1.  Go to Vercel Dashboard -> **Add New...** -> **Project**.
2.  Import the `HALT` repository.
3.  **Project Name**: `halt-frontend` (or similar).
4.  **Framework Preset**: Vite.
5.  **Root Directory**: Click "Edit" and select `frontend`.
6.  **Environment Variables**:
    - `VITE_API_URL`: Set this to the **Backend URL** from step 1 (e.g., `https://halt-backend.vercel.app`).
    - *Note: Do not include a trailing slash.*
7.  Click **Deploy**.

---

## Part 2: CI/CD Setup (GitHub Actions)

We have set up a GitHub Actions workflow (`.github/workflows/deploy.yml`) to automatically deploy both projects when you push to `main`.

### Prerequisites: Configure Secrets
For the workflow to work, you must add the following **Secrets** to your GitHub Repository:
1.  Go to **GitHub Repo** -> **Settings** -> **Secrets and variables** -> **Actions**.
2.  Click **New repository secret** for each of the following:

| Secret Name | How to find it |
|:--- |:--- |
| `VERCEL_TOKEN` | Vercel User Settings -> Tokens -> Create. |
| `VERCEL_ORG_ID` | Vercel Account/Team Settings -> General -> **Team ID** (or User ID). |
| `VERCEL_PROJECT_ID_FRONTEND` | Vercel Dashboard -> Frontend Project -> Settings -> General -> **Project ID**. |
| `VERCEL_PROJECT_ID_BACKEND` | Vercel Dashboard -> Backend Project -> Settings -> General -> **Project ID**. |

### Workflow Behavior
- **Trigger**: Push to `main`.
- **Jobs**:
    - `deploy-frontend`: Builds and deploys the `frontend` folder using the Vercel CLI.
    - `deploy-backend`: Builds and deploys the `backend` folder using the Vercel CLI.

---

## Troubleshooting
- **Frontend mismatch**: If the frontend doesn't show the layout from the backend, check the `VITE_API_URL` env var in Vercel and ensure a new deployment was triggered after setting it.
- **Workflow failure**: Check the "Actions" tab in GitHub. Common errors are missing secrets or permissions.
