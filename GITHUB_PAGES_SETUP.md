# GitHub Pages Setup Guide for idatagear.com

This guide explains how to deploy your Flutter web apps to GitHub Pages.

---

## ⚠️ Important: GitHub Pages Limitations

GitHub Pages **does NOT support server-side rewrites** like Apache or Nginx. This means:

- ❌ You cannot use `.htaccess` files
- ❌ You cannot configure server-side routing
- ❌ Direct folder access (e.g., `/learnchinese/`) may show 404
- ✅ You CAN use workarounds (see below)

---

## Setup Steps

### Step 1: Create `.nojekyll` File

**Already Created:** ✅ `.nojekyll` file exists in root

This file disables Jekyll processing, which is required for Flutter web apps.

**What it does:**

- Prevents Jekyll from processing your files
- Allows files starting with `_` to be served
- Required for Flutter web builds

---

### Step 2: Update 404.html for SPA Routing

**Option A: Use the provided 404-github-pages.html**

1. **Rename** `404-github-pages.html` to `404.html` (backup the existing one first if needed)
2. This file will handle routing for your Flutter SPAs

**Option B: Keep existing 404.html**

If you want to keep your current Firebase 404.html, you can:

- Use direct `index.html` URLs (see Step 3)
- Or create redirect pages (see Step 4)

---

### Step 3: Access URLs on GitHub Pages

**With 404.html routing workaround:**

- ✅ `https://yourusername.github.io/learnchinese/` → Redirects to `/learnchinese/index.html`
- ✅ `https://yourusername.github.io/learncantonese/` → Redirects to `/learncantonese/index.html`
- ✅ `https://yourusername.github.io/gcd/` → Redirects to `/gcd/index.html`
- ✅ `https://yourusername.github.io/testlearnchinese/` → Redirects to `/testlearnchinese/index.html`
- ✅ `https://yourusername.github.io/testlearncantonese/` → Redirects to `/testlearncantonese/index.html`

**Direct access (always works):**

- ✅ `https://yourusername.github.io/learnchinese/index.html`
- ✅ `https://yourusername.github.io/learncantonese/index.html`
- ✅ `https://yourusername.github.io/gcd/index.html`
- ✅ `https://yourusername.github.io/testlearnchinese/index.html`
- ✅ `https://yourusername.github.io/testlearncantonese/index.html`

---

### Step 4: Create Redirect Pages (Optional)

Create simple HTML redirect pages in the root for cleaner URLs:

**Create `learnchinese.html` in root:**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0; url=/learnchinese/index.html" />
    <link rel="canonical" href="/learnchinese/index.html" />
  </head>
  <body>
    <p>
      Redirecting to <a href="/learnchinese/index.html">Learn Chinese</a>...
    </p>
  </body>
</html>
```

Repeat for each app:

- `learncantonese.html`
- `gcd.html`
- `testlearnchinese.html`
- `testlearncantonese.html`

Then users can access:

- `https://yourusername.github.io/learnchinese.html` → Redirects to app

---

## Deployment Methods

### Method 1: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main] # Change to your default branch

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Pages
        uses: actions/configure-pages@v2

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: "."

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
```

**Steps:**

1. Create `.github/workflows/` directory
2. Create `deploy.yml` with the content above
3. Push to your repository
4. Go to repository Settings → Pages
5. Select "GitHub Actions" as source
6. The workflow will deploy automatically on push

---

### Method 2: gh-pages Branch

1. **Create gh-pages branch:**

   ```bash
   git checkout -b gh-pages
   git push origin gh-pages
   ```

2. **Configure in GitHub:**

   - Go to repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose `gh-pages` branch
   - Select `/ (root)` folder

3. **Update and push:**
   ```bash
   # Make changes
   git add .
   git commit -m "Update site"
   git push origin gh-pages
   ```

---

### Method 3: Manual Upload

1. Go to repository Settings → Pages
2. Select "Deploy from a branch"
3. Choose your branch (e.g., `main`)
4. Select `/ (root)` folder
5. GitHub will serve files from the root

---

## Custom Domain Setup

If using `idatagear.com` with GitHub Pages:

1. **Create `CNAME` file** in root:

   ```
   www.idatagear.com
   idatagear.com
   ```

2. **Configure DNS:**

   - Add A records pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Or add CNAME record: `www` → `yourusername.github.io`

3. **Enable in GitHub:**
   - Repository Settings → Pages
   - Enter your custom domain
   - GitHub will verify and configure HTTPS

---

## File Checklist

Before deploying to GitHub Pages:

- [x] `.nojekyll` file exists ✅
- [ ] `404.html` updated for SPA routing (or use direct URLs)
- [x] All Flutter apps have correct base hrefs ✅
- [ ] `CNAME` file (if using custom domain)
- [ ] GitHub Actions workflow (if using Method 1)

---

## Testing After Deployment

1. **Test main site:**

   - `https://yourusername.github.io/` or `https://www.idatagear.com/`

2. **Test each Flutter app:**

   - `https://yourusername.github.io/learnchinese/index.html`
   - `https://yourusername.github.io/learncantonese/index.html`
   - `https://yourusername.github.io/gcd/index.html`
   - `https://yourusername.github.io/testlearnchinese/index.html`
   - `https://yourusername.github.io/testlearncantonese/index.html`

3. **Test with 404.html routing (if implemented):**

   - `https://yourusername.github.io/learnchinese/`
   - Should redirect to `/learnchinese/index.html`

4. **Check browser console:**
   - Look for 404 errors on assets
   - Verify all files load correctly

---

## Troubleshooting

### Issue: "404 Not Found" for folder paths

**Cause:** GitHub Pages doesn't support directory redirects

**Solutions:**

1. Use direct `index.html` URLs
2. Use the 404.html routing workaround
3. Create redirect HTML pages

### Issue: Assets not loading

**Possible Causes:**

1. Base href mismatch
2. Files not committed to repository
3. Jekyll processing files (need `.nojekyll`)

**Solutions:**

1. Verify base href matches folder path
2. Ensure all files are committed
3. Ensure `.nojekyll` file exists

### Issue: Jekyll processing files

**Solution:** Ensure `.nojekyll` file exists in root

---

## Summary

✅ **What Works:**

- Direct `index.html` URLs always work
- 404.html routing workaround for cleaner URLs
- Custom domain support
- GitHub Actions for automated deployment

⚠️ **Limitations:**

- No server-side rewrites
- Must use workarounds for SPA routing
- Folder paths (without `/index.html`) may not work without 404.html

🎯 **Recommended Approach:**

1. Use `.nojekyll` file ✅ (already created)
2. Use 404.html routing workaround (rename `404-github-pages.html` to `404.html`)
3. Deploy via GitHub Actions
4. Test all URLs after deployment

---

## Next Steps

1. ✅ `.nojekyll` file created
2. ⚠️ Update `404.html` (rename `404-github-pages.html` if you want SPA routing)
3. ⚠️ Set up GitHub Actions workflow (optional but recommended)
4. ⚠️ Configure custom domain (if using idatagear.com)
5. ⚠️ Deploy and test
