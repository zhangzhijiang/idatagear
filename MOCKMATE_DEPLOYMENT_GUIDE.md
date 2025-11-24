# MockMate Deployment Guide

## Current Status

**Folder:** `mockmate/`  
**Target URL:** `https://www.idatagear.com/mockmate/`  
**Note:** You mentioned `/mockmake/` in your question - if you want that URL instead, we can update the configuration.

---

## Issues Found

### ❌ Issue 1: Missing Base Path Configuration
- **Problem:** Vite config didn't have `base` path set for subdirectory deployment
- **Status:** ✅ **FIXED** - Added `base: '/mockmate/'` to `vite.config.ts`

### ❌ Issue 2: App Not Built for Production
- **Problem:** This is a Vite/React app that needs to be built before deployment
- **Status:** ⚠️ **NEEDS ACTION** - Must run `npm run build`

### ❌ Issue 3: No Built Files
- **Problem:** No `dist` folder exists (build output)
- **Status:** ⚠️ **NEEDS ACTION** - Will be created after build

---

## Deployment Steps

### Step 1: Install Dependencies (if not done)

```bash
cd mockmate
npm install
```

### Step 2: Configure Environment Variables

Create a `.env.local` file in the `mockmate` folder:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

### Step 3: Build for Production

```bash
cd mockmate
npm run build
```

This will create a `dist` folder with the production-ready files.

### Step 4: Deploy the Built Files

**Option A: If using Firebase Hosting**

1. Copy the contents of `mockmate/dist/` to your web server's `mockmate/` directory
2. Or update `firebase.json` to include the mockmate folder

**Option B: Direct Web Server Deployment**

1. Build the app: `npm run build`
2. Copy all files from `mockmate/dist/` to your web server at `/mockmate/`
3. Ensure the server serves `index.html` for all routes (SPA routing)

---

## Configuration Changes Made

### ✅ Updated `vite.config.ts`

Added `base: '/mockmate/'` to the Vite configuration. This ensures:
- All asset paths are correctly prefixed with `/mockmate/`
- The app works correctly when served from a subdirectory
- React Router (if used) handles routes correctly

**If you want `/mockmake/` instead:**
- Change `base: '/mockmate/'` to `base: '/mockmake/'` in `vite.config.ts`
- Rebuild the app

---

## Verification Checklist

After deployment, verify:

- [ ] App is accessible at: `https://www.idatagear.com/mockmate/`
- [ ] All assets (CSS, JS, images) load correctly
- [ ] No 404 errors in browser console
- [ ] React app initializes and renders
- [ ] API calls work (if using Gemini API)

---

## Testing Locally

Before deploying, test the production build locally:

```bash
cd mockmate
npm run build
npm run preview
```

Visit `http://localhost:4173/mockmate/` to test.

---

## Important Notes

### 1. SPA Routing
This is a Single Page Application (SPA). Your web server must be configured to:
- Serve `index.html` for all routes under `/mockmate/`
- Handle client-side routing (React Router)

### 2. Asset Paths
With `base: '/mockmate/'` configured, all assets will be correctly referenced.

### 3. Environment Variables
- The app uses `GEMINI_API_KEY` from environment variables
- For production, ensure the API key is set in your deployment environment
- **Never commit API keys to version control**

### 4. CDN Dependencies
The app uses CDN imports for React and other libraries (from `aistudiocdn.com`). These should work fine, but ensure:
- Your site allows loading from these CDNs
- No Content Security Policy (CSP) blocks these domains

---

## Troubleshooting

### Issue: 404 Errors for Assets

**Solution:** Ensure `base: '/mockmate/'` is set in `vite.config.ts` and rebuild.

### Issue: Blank Page

**Possible Causes:**
1. JavaScript errors - Check browser console
2. Missing API key - Check environment variables
3. Incorrect base path - Verify `base` in vite.config.ts matches deployment path

### Issue: Routes Not Working

**Solution:** Configure your web server to serve `index.html` for all routes under `/mockmate/`.

**For Apache (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /mockmate/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /mockmate/index.html [L]
</IfModule>
```

**For Nginx:**
```nginx
location /mockmate/ {
  try_files $uri $uri/ /mockmate/index.html;
}
```

---

## Next Steps

1. ✅ **Vite config updated** - Base path configured
2. ⚠️ **Build the app** - Run `npm run build` in the `mockmate` folder
3. ⚠️ **Deploy built files** - Copy `dist/` contents to web server
4. ⚠️ **Test the URL** - Visit `https://www.idatagear.com/mockmate/`
5. ⚠️ **Configure server** - Ensure SPA routing works correctly

---

## URL Mismatch Note

You mentioned accessing via `/mockmake/` but the folder is `mockmate/`. 

**Options:**
1. **Use `/mockmate/`** (matches folder name) - ✅ Already configured
2. **Use `/mockmake/`** - Change `base: '/mockmate/'` to `base: '/mockmake/'` in vite.config.ts
3. **Rename folder** - Rename `mockmate/` to `mockmake/` and update base path

Let me know which URL you prefer!

