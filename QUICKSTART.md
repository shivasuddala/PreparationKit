# InterviewPrep - Quick Start Guide

Welcome to InterviewPrep! This guide will help you get the application up and running in minutes.

## 🎯 Quick Setup (5 minutes)

### Step 1: Start the Backend

Open PowerShell and navigate to the project root:

```powershell
cd C:\Users\shiva\GitProjects\PreparationKit
```

Build the project:

```powershell
mvn clean package
```

Start the Spring Boot application:

```powershell
mvn spring-boot:run
```

You should see output like:
```
Started Main in X.XXX seconds
H2 console available at 'http://localhost:8080/h2-console'
```

✅ Backend is ready at `http://localhost:8080`

### Step 2: Start the Frontend

Open another PowerShell window and navigate to frontend:

```powershell
cd C:\Users\shiva\GitProjects\PreparationKit\frontend
npm install
npm start
```

Your browser will automatically open to `http://localhost:3000`

✅ Frontend is ready!

## 🎨 What You'll See

### Home Page
- Three beautiful topic cards: Java, Spring Boot, SQL
- Each card shows topic name, description, and question count
- Hover effects and gradient animations

### Topics Page
- Experience level filter buttons (Beginner, Intermediate, Advanced, Expert)
- Subtopic cards with question counts
- Click any subtopic to view questions

### Questions Page
- Expandable question cards
- Quick answers (1-2 lines for rapid revision)
- "Know More" button for detailed explanations
- Copy buttons to clipboard for both short and detailed answers

## 📊 Sample Data Included

The application comes pre-loaded with:

**Java (12 questions)**
- What is Java?
- JVM, JRE, JDK explanation
- Bytecode basics
- Data types and memory
- String immutability
- Method overloading & overriding
- Design Patterns (Singleton, Factory)
- Garbage Collection
- Reflection
- Multithreading

**Spring Boot (6 questions)**
- What is Spring Boot?
- Auto-configuration
- Dependency Injection
- IoC Container
- Spring Data JPA
- REST APIs

**SQL (10 questions)**
- SQL fundamentals
- ACID properties
- Aggregate functions
- LIKE operator
- JOIN operations
- Subqueries
- UNION operations
- Indexing
- Query optimization

## 🎮 How to Use

### Study Mode
1. Select a language (Java, Spring Boot, or SQL)
2. Browse through topics by reading descriptions
3. Filter by experience level to focus on your skill
4. Click a subtopic to view questions
5. Read quick answers first
6. Expand to see detailed explanations

### Interview Prep Mode
1. Set experience level to your target level
2. Read through quick answers rapidly
3. Use "Know More" to deepen understanding
4. Copy answers to create your study notes
5. Revisit challenging topics

## 🔍 Exploring the API

The backend provides REST endpoints. Test them using Postman or curl:

### Get All Topics
```bash
curl http://localhost:8080/api/topics
```

### Get All Questions for Java Basics
```bash
curl "http://localhost:8080/api/questions?subtopicId=1"
```

### Filter by Experience Level
```bash
curl "http://localhost:8080/api/questions?subtopicId=1&experienceLevelId=1"
```

### Get All Experience Levels
```bash
curl http://localhost:8080/api/experience-levels
```

## 🗄️ H2 Database Console

Access the H2 console at: `http://localhost:8080/h2-console`

- **JDBC URL**: `jdbc:h2:mem:testdb`
- **User Name**: `sa`
- **Password**: (leave empty)

Browse database tables and run custom SQL queries.

## 🌐 API Documentation

### Base URL: `http://localhost:8080/api`

#### Topics
- `GET /topics` - List all topics
- `GET /topics/{id}` - Get specific topic with subtopics

#### Subtopics
- `GET /subtopics` - List all subtopics
- `GET /subtopics/{id}` - Get specific subtopic with questions

#### Questions
- `GET /questions` - List all questions
- `GET /questions?subtopicId={id}` - Filter by subtopic
- `GET /questions?subtopicId={id}&experienceLevelId={id}` - Filter by both
- `GET /questions/{id}` - Get specific question with answer

#### Experience Levels
- `GET /experience-levels` - List all levels

## 📱 Responsive Design

The UI works perfectly on:
- 🖥️ Desktop (1920x1080+)
- 💻 Laptop (1366x768)
- 📱 Tablet (768x1024)
- 📲 Mobile (375x667)

## 🎨 Dark Theme Features

- Eye-friendly dark blue background (#0b1021)
- Gradient effects on titles and buttons
- Smooth hover animations
- Color-coded difficulty badges
- Accessible contrast ratios

## 🔧 Troubleshooting

### Backend won't start
```
Check if port 8080 is in use:
netstat -ano | findstr :8080

Solution: Close the process or change port in application.properties
```

### Frontend shows error connecting to API
```
Ensure backend is running:
http://localhost:8080/api/topics should work

Check browser console for CORS errors
```

### No data showing
```
Wait 2-3 seconds for data seeding
Refresh the browser (Ctrl+R)
Check browser Network tab for API responses
```

## 🚀 Development Tips

### Hot Reload
- Frontend: Changes reload automatically
- Backend: Use `mvn spring-boot:run` for live changes with spring-boot-devtools

### Debug
- Browser DevTools: Press F12
- Network Tab: See all API calls
- Console: Check for errors
- React DevTools: Browser extension

### Customize
- Edit `DataSeeder.java` to add more questions
- Modify `src/index.css` for styling changes
- Update component files for UI changes

## 📚 Learning Path

**Beginner to Expert**
1. Start with Beginner level questions
2. Understand quick answers thoroughly
3. Read "Know More" sections
4. Move to Intermediate
5. Progress to Advanced/Expert levels
6. Review all levels before interview

## ⚡ Performance Tips

- Questions load instantly from in-memory H2 database
- React optimizes re-renders automatically
- CSS animations are GPU-accelerated
- Smooth scrolling enabled

## 🎓 Best Practices

1. **Active Recall**: Test yourself without looking
2. **Spaced Repetition**: Revisit topics periodically
3. **Deep Understanding**: Always read "Know More"
4. **Notes**: Copy answers and create your own summaries
5. **Practice**: Implement concepts in code

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Review application logs
3. Check browser console (F12)
4. Verify all services are running

## 🎉 Ready to Start?

1. Backend running? ✅
2. Frontend running? ✅
3. Browser at localhost:3000? ✅

**You're all set! Happy learning! 🚀**

---

**Pro Tip**: Open this guide alongside your browser for easy reference while studying!

