# Quick Deploy Commands for Windows PowerShell

# InterviewPrep - GitHub Pages Deployment

Write-Host "🚀 InterviewPrep - GitHub Pages Deployment" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Step 1: Update your GitHub username in package.json" -ForegroundColor Yellow
Write-Host "   Edit: frontend\package.json"
Write-Host "   Line 5: `"homepage`": `"https://YOUR-USERNAME.github.io/PreparationKit`""
Write-Host ""
Read-Host "Press Enter after updating package.json"

Write-Host ""
Write-Host "📦 Step 2: Installing gh-pages..." -ForegroundColor Yellow
Set-Location frontend
npm install --save-dev gh-pages

Write-Host ""
Write-Host "🔨 Step 3: Building production version..." -ForegroundColor Yellow
npm run build

Write-Host ""
Write-Host "🚀 Step 4: Deploying to GitHub Pages..." -ForegroundColor Yellow
npm run deploy

Write-Host ""
Write-Host "✅ Deployment Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Your site will be live in 1-2 minutes at:"
Write-Host "https://YOUR-USERNAME.github.io/PreparationKit" -ForegroundColor Cyan
Write-Host ""
Write-Host "Note: Replace YOUR-USERNAME with your actual GitHub username" -ForegroundColor Gray

