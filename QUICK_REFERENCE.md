mnp# InterviewPrep - Quick Reference Card

## 🚀 Start Here

### 1️⃣ Terminal 1 - Backend
```bash
cd C:\Users\shiva\GitProjects\PreparationKit
mvn clean package
mvn spring-boot:run
```
✅ Ready at `http://localhost:8080`

### 2️⃣ Terminal 2 - Frontend
```bash
cd frontend
npm install
npm start
```
✅ Opens at `http://localhost:3000`

## 📚 Documentation Quick Links

| Need | File | Time |
|------|------|------|
| Setup | [QUICKSTART.md](./QUICKSTART.md) | 5 min |
| Overview | [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | 10 min |
| Full Guide | [README.md](./README.md) | 30 min |
| How to Use | [FEATURES.md](./FEATURES.md) | 15 min |
| Architecture | [ARCHITECTURE.md](./ARCHITECTURE.md) | 20 min |
| Deploy | [DEPLOYMENT.md](./DEPLOYMENT.md) | 30 min |
| Navigation | [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md) | 5 min |

## 🎯 Content Coverage

### Java (12 Q)
- Basics: Java, JVM/JRE/JDK, Bytecode, OOP
- Data Types: Primitives, String immutability
- Functions: Overloading, Overriding
- Patterns: Singleton, Factory
- Advanced: GC, Reflection, Multithreading

### Spring Boot (6 Q)
- Basics: Spring Boot, Auto-config
- DI: Dependency Injection, IoC
- Data: Spring Data JPA
- REST: REST APIs

### SQL (10 Q)
- Basics: SQL, ACID
- Functions: Aggregates, String functions
- Joins: INNER, LEFT, RIGHT
- Advanced: Subqueries, UNION
- Performance: Indexing, Optimization

## 🎨 UI Features

### Home Page
- 3 topic cards: Java, Spring Boot, SQL
- Click any to explore

### Topics Page
- Filter by level: Beginner / Intermediate / Advanced / Expert
- Browse subtopics
- Click to view questions

### Questions Page
- Read short answers (quick)
- Expand "Know More" for details
- Copy answers to clipboard

## 🔌 API Quick Reference

```bash
# Get all topics
curl http://localhost:8080/api/topics

# Get topic by ID
curl http://localhost:8080/api/topics/1

# Get questions for subtopic
curl "http://localhost:8080/api/questions?subtopicId=1"

# Filter by experience level
curl "http://localhost:8080/api/questions?subtopicId=1&experienceLevelId=1"

# Get all experience levels
curl http://localhost:8080/api/experience-levels

# H2 Console
http://localhost:8080/h2-console
# Username: sa
# Password: (empty)
```

## 🛠️ Technology Stack

```
Frontend:  React 19 + CSS3 + Lucide Icons
Backend:   Spring Boot 3.2 + Java 21
Database:  H2 (in-memory)
Build:     Maven + npm
```

## 🔧 Common Tasks

### Add More Questions
Edit `src/main/java/org/example/config/DataSeeder.java`

### Change Styling
Edit `frontend/src/components/*.css`

### Modify Components
Edit `frontend/src/components/*.js`

### Update Server Port
Edit `src/main/resources/application.properties`

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend won't start | Check port 8080 is free |
| Frontend won't load | Ensure backend is running |
| No questions showing | Wait 2-3 sec for data seeding |
| CORS error | Backend might be down |
| Port already in use | Kill process on that port |

## 📱 Mobile Access

```
Open in browser: http://localhost:3000
Works on phones and tablets
Touch-friendly design
```

## 🎓 Study Tips

1. **Quick Review**: Read all short answers (5 min)
2. **Deep Dive**: Read full explanations (30 min)
3. **Test Yourself**: Try before peeking at answer
4. **Take Notes**: Copy answers to create study guide
5. **Spaced Repetition**: Review daily

## 📊 Project Stats

- **30+ Questions** across 3 topics
- **4 Difficulty Levels** for targeted learning
- **100% Responsive** design
- **2000+ Lines** of code
- **6 Documentation** files
- **Production Ready** 

## 🎯 Learning Path

```
Day 1-2: Java Basics + Data Types
Day 3-4: Java Advanced + Patterns
Day 5-6: Spring Boot
Day 7-8: SQL Basics + Joins
Day 9: SQL Advanced + Optimization
Day 10: Review + Practice
```

## 💡 Pro Tips

- 💾 Copy answers to Notion/OneNote
- 🎤 Say answers aloud to practice
- ⏱️ Time yourself on answers
- 🤝 Share with study group
- 🔄 Review weak areas often
- 📱 Use on mobile while commuting

## 🚀 One-Command Setup

```bash
# Clone (if from git)
git clone <repo>
cd PreparationKit

# Run in two terminals
# Terminal 1:
mvn spring-boot:run

# Terminal 2:
cd frontend && npm install && npm start
```

## 📞 Need Help?

1. Check QUICKSTART.md
2. Search in README.md
3. Review FEATURES.md
4. Check browser console (F12)
5. Review server logs

## ✅ Checklist

- [ ] Backend running? (port 8080)
- [ ] Frontend running? (port 3000)
- [ ] Browser opened? (localhost:3000)
- [ ] Can see topics? (Home page)
- [ ] Can filter levels? (Topics page)
- [ ] Can read answers? (Questions page)
- [ ] Can copy text? (Copy button)

## 🎉 You're Ready!

All set to start your interview preparation journey! 

**Next Step**: Open http://localhost:3000 and start studying! 🚀

---

**Print this card and keep it handy! 📋**

| Shortcut | Purpose |
|----------|---------|
| Ctrl+R | Refresh browser |
| F12 | Open DevTools |
| Ctrl+C | Stop server |
| Ctrl+Shift+C | Inspect element |

**Happy Learning! 🎓**

