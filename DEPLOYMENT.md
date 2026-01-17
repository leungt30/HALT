# Vercel Deployment Guide

This guide walks you through setting up the Monorepo (Frontend + Backend) on Vercel.

## Strategy
Vercel supports monorepos by allowing you to create multiple **Projects** from the same GitHub repository, each with a different **Root Directory**.

We will create two projects:
1.  **HALT Frontend** (Root: `frontend`)
2.  **HALT Backend** (Root: `backend`)

## Prerequisites
1.  Verify your code is pushed to GitHub (merged to `main`).
2.  Log in to [Vercel](https://vercel.com).

## Step 1: Deploying the Backend

1.  Click **"Add New..."** -> **"Project"** in Vercel.
2.  Import your `HALT` GitHub repository.
3.  **Configure Project**:
    *   **Project Name**: `halt-backend` (or similar).
    *   **Framework Preset**: Other (default) or Express.
    *   **Root Directory**: Click "Edit" and select `backend`.
4.  **Environment Variables**: None needed for MVP (unless changing ports/settings).
5.  Click **Deploy**.

**Result**: You will get a URL like `https://halt-backend.vercel.app`.
**Copy this URL**. You will need it for the frontend.

## Step 2: Deploying the Frontend

1.  Click **"Add New..."** -> **"Project"**.
2.  Import the *same* `HALT` repository again.
3.  **Configure Project**:
    *   **Project Name**: `halt-frontend` (or similar).
    *   **Framework Preset**: Vite (Vercel should auto-detect this).
    *   **Root Directory**: Click "Edit" and select `frontend`.
4.  **Environment Variables**:
    *   Currently, the frontend hardcodes `http://localhost:3000`. We need to fix this to use the live backend URL.
    *   (Action Required): Update `frontend/src/App.tsx` to use an environment variable (e.g., `VITE_API_URL`) instead of localhost.
    *   Add `VITE_API_URL` = `https://halt-backend.vercel.app` (from Step 1).
5.  Click **Deploy**.

## Troubleshooting: Changing Root Directory
If you missed setting the Root Directory during creation:
1.  Go to your Project Dashboard on Vercel.
2.  Navigate to **Settings** (tab) -> **General**.
3.  Find the **"Root Directory"** section.
4.  Enter `frontend` (or `backend`) in the input field.
5.  Click **Save**.
6.  **Redeploy** to apply changes.

## Continuous Deployment
Since Vercel is connected to your GitHub repository:
-   **Push to Main**: Automatically triggers a production deployment for *both* projects (if files in their respective folders changed).
-   **Pull Requests**: Vercel will create Preview Deployments for every PR.

## Important Note on API URL
Before deploying the frontend, you **must** refactor `App.tsx` to read the API URL from the environment, otherwise, the deployed site will try to fetch from localhost and fail.

**Suggested `App.tsx` Change:**
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
fetch(`${API_URL}/api/layout`)
```
