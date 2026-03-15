#!/bin/bash
# Quick Deploy Script for GitHub Pages

echo "🚀 InterviewPrep - GitHub Pages Deployment"
echo ""
echo "📝 Step 1: Update your GitHub username in package.json"
echo "   Edit: frontend/package.json"
echo "   Line 5: \"homepage\": \"https://YOUR-USERNAME.github.io/PreparationKit\""
echo ""
read -p "Press Enter after updating package.json..."

echo ""
echo "📦 Step 2: Installing gh-pages..."
cd frontend
npm install --save-dev gh-pages

echo ""
echo "🔨 Step 3: Building production version..."
npm run build

echo ""
echo "🚀 Step 4: Deploying to GitHub Pages..."
npm run deploy

echo ""
echo "✅ Deployment Complete!"
echo ""
echo "Your site will be live in 1-2 minutes at:"
echo "https://YOUR-USERNAME.github.io/PreparationKit"
echo ""
echo "Note: Replace YOUR-USERNAME with your actual GitHub username"

