# 🚀 GitHub Pages Deployment Guide

## Quick Deploy Instructions

### Step 1: Install gh-pages
```bash
cd frontend
npm install --save-dev gh-pages
```

### Step 2: Update package.json
Add your GitHub username to the homepage URL:
```json
"homepage": "https://YOUR-USERNAME.github.io/PreparationKit"
```

Replace `YOUR-USERNAME` with your actual GitHub username.

### Step 3: Deploy
```bash
npm run deploy
```

This will:
1. Build the production version
2. Create a `gh-pages` branch
3. Push the build folder to GitHub
4. Your site will be live at the homepage URL

---

## Alternative: Manual Deployment

### Option 1: Deploy to Root (username.github.io)

1. Create a repository named `YOUR-USERNAME.github.io`
2. Copy contents of `build/` folder to repository
3. Push to `main` or `master` branch
4. Site will be live at `https://YOUR-USERNAME.github.io`

### Option 2: Deploy to Project Pages

1. Create/use existing repository (e.g., `PreparationKit`)
2. Build the app: `npm run build`
3. Create `gh-pages` branch
4. Copy `build/` contents to `gh-pages` branch
5. Go to repository Settings → Pages
6. Select `gh-pages` branch as source
7. Site will be live at `https://YOUR-USERNAME.github.io/PreparationKit`

---

## Deployment Checklist

- [ ] Build completes without errors (`npm run build`)
- [ ] Test locally by serving build folder
- [ ] Update homepage URL in package.json
- [ ] Run `npm run deploy`
- [ ] Wait 1-2 minutes for GitHub Pages to update
- [ ] Visit your site URL
- [ ] Test all features (navigation, search, expand/collapse)

---

## Testing Build Locally

Before deploying, test the production build locally:

```bash
# Install serve globally (one time)
npm install -g serve

# Serve the build folder
serve -s build

# Open http://localhost:3000
```

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
npm run build -- --force
```

### Deployment Fails
```bash
# Check git remote
git remote -v

# Ensure you're in the correct directory
cd frontend

# Try deploying again
npm run deploy
```

### Site Shows 404
1. Check repository Settings → Pages
2. Ensure source is set to `gh-pages` branch
3. Wait a few minutes and refresh
4. Clear browser cache

### Blank Page After Deploy
1. Check homepage URL in package.json
2. Ensure it matches your GitHub Pages URL
3. Rebuild and redeploy

---

## Custom Domain (Optional)

1. Add a `CNAME` file to `public/` folder:
   ```
   yourdomain.com
   ```

2. Configure DNS:
   - Add A records pointing to GitHub Pages IPs
   - Or add CNAME record pointing to `YOUR-USERNAME.github.io`

3. Enable Custom Domain in repository Settings → Pages

---

## Auto-Deploy with GitHub Actions (Advanced)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          cd frontend
          npm install
      
      - name: Build
        run: |
          cd frontend
          npm run build
      
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@4.1.5
        with:
          branch: gh-pages
          folder: frontend/build
```

---

## URLs Summary

After deployment, your app will be available at:

**Project Pages:**
- URL: `https://YOUR-USERNAME.github.io/PreparationKit`
- Repository: Any name (e.g., PreparationKit)
- Branch: `gh-pages`

**User Pages:**
- URL: `https://YOUR-USERNAME.github.io`
- Repository: `YOUR-USERNAME.github.io`
- Branch: `main` or `master`

---

## Quick Commands Reference

```bash
# Build
npm run build

# Deploy (after setting homepage)
npm run deploy

# Test locally
npm start

# Test production build locally
serve -s build
```

---

**Ready to deploy!** 🚀

Just run `npm run deploy` and your site will be live in minutes!

