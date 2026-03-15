# 🚀 QUICK DEPLOY - 3 COMMANDS

## Deploy to GitHub Pages

### Before You Start:
Update `frontend/package.json` line 5 with YOUR GitHub username:
```json
"homepage": "https://YOUR-USERNAME.github.io/PreparationKit"
```

---

## Command 1: Install gh-pages
```bash
cd frontend
npm install --save-dev gh-pages
```

## Command 2: Deploy
```bash
npm run deploy
```

## Command 3: Visit Your Site (wait 1-2 min)
```
https://YOUR-USERNAME.github.io/PreparationKit
```

---

## Alternative: Use PowerShell Script

```powershell
.\deploy.ps1
```

This will:
1. Prompt you to update package.json
2. Install gh-pages automatically
3. Build the app
4. Deploy to GitHub Pages

---

## Manual Deploy (if script fails)

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install deployment tool
npm install --save-dev gh-pages

# 3. Build
npm run build

# 4. Deploy
npm run deploy
```

---

## Verify Deployment

After deploying, check:
1. GitHub repo → Settings → Pages
2. Should show: "Your site is published at https://..."
3. Wait 1-2 minutes
4. Visit the URL
5. Test all features

---

## Update Existing Deployment

If you make changes:
```bash
cd frontend
npm run build
npm run deploy
```

Changes will be live in 1-2 minutes!

---

## Troubleshooting

### "gh-pages not found"
```bash
npm install --save-dev gh-pages
```

### "Permission denied"
```bash
# On Windows, run PowerShell as Administrator
# Or check your Git credentials
git config --list
```

### "Build failed"
```bash
# Clear and rebuild
npm run build -- --force
```

### Site shows 404
- Check homepage URL in package.json
- Wait 2-3 minutes after deploy
- Check GitHub Settings → Pages is enabled

---

**That's it! Simple 3-step deployment! 🎉**

