# 📚 Interview Preparation Kit

A modern React-based interview preparation platform for mastering **Java**, **Spring Boot**, **CI/CD & DevOps**, and **Database & SQL**.

🔗 **Live**: [shivasuddala.github.io/PreparationKit](https://shivasuddala.github.io/PreparationKit)

## Features

- 📖 **Detailed Study Mode** — In-depth explanations with code examples
- ⚡ **Last Minute Prep** — Quick bullet-point revision guides
- 🔍 **Search** — Find any concept across all topics instantly
- 🎯 **Experience Levels** — Filter by Fresher, Junior, Mid, Senior
- 📥 **PDF Export** — Download topics or entire guides as PDF
- ▶️ **Code Playground** — Run Java, SQL, Python, JavaScript in-browser
- 📱 **Responsive** — Works on desktop, tablet, and mobile

## Tech Stack

- **React 19** — UI framework
- **GitHub Pages** — Static hosting
- **Piston API** — Code execution engine

## Run Locally

```bash
cd frontend
npm install
npm start
```

Opens at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
PreparationKit/
├── .github/workflows/deploy.yml   # Auto-deploy to GitHub Pages
├── frontend/
│   ├── public/                    # Static assets
│   └── src/
│       ├── App.js                 # Main application
│       ├── App.css                # Styles
│       └── data/                  # Interview content
│           ├── index.js           # Data aggregator
│           ├── java.js            # Java topics
│           ├── springboot.js      # Spring Boot topics
│           ├── cicd.js            # CI/CD & DevOps topics
│           └── database.js        # Database & SQL topics
└── README.md
```
