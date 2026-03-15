# InterviewPrep - Master Interview Preparation Kit

A beautiful, modern, full-stack interview preparation platform built with React and Spring Boot, designed to help developers master technical interviews for Java, Spring Boot, and SQL.

## 🌟 Features

### Frontend (React)
- **Modern UI/UX**: Beautiful dark-themed interface with gradient effects and smooth animations
- **Language Selection**: Choose between Java, Spring Boot, and SQL
- **Topic Browser**: Explore topics organized by category and subtopic
- **Experience Level Filtering**: Filter questions by Beginner, Intermediate, Advanced, and Expert levels
- **Quick & Deep Learning**: 
  - Quick answers for rapid review
  - "Know More" section for detailed explanations
  - Copy-to-clipboard functionality for answers
- **Responsive Design**: Fully mobile-friendly
- **Interactive Cards**: Smooth hover effects and expandable content

### Backend (Spring Boot)
- **RESTful API**: Complete REST API for all resources
- **Data Persistence**: H2 database with JPA/Hibernate ORM
- **Comprehensive Data**: 
  - 3 main topics (Java, Spring Boot, SQL)
  - 5 subtopics each
  - Multiple questions per subtopic
  - Experience levels (Beginner, Intermediate, Advanced, Expert)
- **CORS Support**: Cross-origin requests enabled for frontend integration
- **Automatic Data Seeding**: Pre-loaded interview questions and answers

## 📁 Project Structure

```
PreparationKit/
├── frontend/                          # React application
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js/css          # Top navigation
│   │   │   ├── LanguageSelector.js/css # Topic selection
│   │   │   ├── TopicsExplorer.js/css  # Subtopic browsing
│   │   │   └── QuestionsView.js/css   # Q&A display
│   │   ├── App.js/css                 # Main app component
│   │   ├── index.js/css               # Global styles
│   │   └── index.html
│   └── package.json
│
└── src/main/java/org/example/
    ├── Main.java                      # Spring Boot entry point
    ├── config/
    │   └── DataSeeder.java            # Seed interview data
    ├── controller/
    │   ├── TopicController.java
    │   ├── SubtopicController.java
    │   ├── QuestionController.java
    │   ├── AnswerController.java
    │   └── ExperienceLevelController.java
    ├── model/
    │   ├── Topic.java
    │   ├── Subtopic.java
    │   ├── Question.java
    │   ├── Answer.java
    │   └── ExperienceLevel.java
    ├── repository/
    │   ├── TopicRepository.java
    │   ├── SubtopicRepository.java
    │   ├── QuestionRepository.java
    │   ├── AnswerRepository.java
    │   └── ExperienceLevelRepository.java
    └── service/
        ├── TopicService.java
        ├── SubtopicService.java
        ├── QuestionService.java
        ├── AnswerService.java
        └── ExperienceLevelService.java
```

## 🚀 Getting Started

### Prerequisites
- **Java 21+**
- **Maven**
- **Node.js 18+**
- **npm or yarn**

### Backend Setup

1. **Navigate to project root**:
   ```bash
   cd C:\Users\shiva\GitProjects\PreparationKit
   ```

2. **Build with Maven**:
   ```bash
   mvn clean package
   ```

3. **Run Spring Boot application**:
   ```bash
   mvn spring-boot:run
   ```

   Or directly run:
   ```bash
   java -jar target/PreparationKit-1.0-SNAPSHOT.jar
   ```

   The backend will be available at `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`

## 📚 Available Topics & Categories

### Java
- **Basics**: JVM, JRE, JDK, Bytecode, OOP principles
- **Data Types**: Primitive types, Reference types, String immutability
- **Functions**: Method overloading, Method overriding, Polymorphism
- **Design Patterns**: Singleton, Factory, Observer patterns
- **Advanced Topics**: Garbage collection, Reflection, Multithreading

### Spring Boot
- **Basics**: Auto-configuration, Embedded servers, Starter dependencies
- **Dependency Injection**: IoC container, Bean lifecycle, Autowiring
- **Data Access**: Spring Data JPA, Repositories, Database operations
- **REST APIs**: RESTful services, HTTP methods, Status codes
- **Security**: Spring Security, Authentication, Authorization

### SQL
- **Basics**: SQL fundamentals, CRUD operations, ACID properties
- **Functions**: Aggregate functions, String functions, Date functions
- **Joins**: INNER, LEFT, RIGHT, FULL OUTER joins
- **Advanced Topics**: Subqueries, CTEs, Window functions
- **Performance & Indexing**: Indexing strategies, Query optimization

## 🎨 UI/UX Highlights

### Design System
- **Dark Theme**: Eye-friendly dark mode perfect for long study sessions
- **Color Palette**: 
  - Primary: Blue (#3b82f6)
  - Secondary: Purple (#8b5cf6)
  - Success: Green (#10b981)
  - Warning: Amber (#f59e0b)
  - Danger: Red (#ef4444)

### Key Components

1. **Header**: Navigation with breadcrumbs and back buttons
2. **Language Selector**: Card-based topic selection with descriptions
3. **Topics Explorer**: Filter by experience level with visual indicators
4. **Questions View**: 
   - Expandable question cards
   - Quick answers (1-2 lines)
   - "Know More" detailed explanations
   - Copy-to-clipboard buttons
   - Experience level badges

### Animations & Transitions
- Smooth fade-in animations for content
- Hover effects on interactive elements
- Expandable card transitions
- Icon animations (chevron rotation, opacity)
- Gradient text animations

## 🔌 API Endpoints

### Topics
- `GET /api/topics` - Get all topics
- `GET /api/topics/{id}` - Get topic by ID

### Subtopics
- `GET /api/subtopics` - Get all subtopics
- `GET /api/subtopics/{id}` - Get subtopic by ID

### Questions
- `GET /api/questions` - Get all questions
- `GET /api/questions?subtopicId={id}` - Get questions by subtopic
- `GET /api/questions?subtopicId={id}&experienceLevelId={id}` - Get filtered questions
- `GET /api/questions/{id}` - Get question by ID

### Experience Levels
- `GET /api/experience-levels` - Get all experience levels

### Answers
- `GET /api/answers` - Get all answers
- `GET /api/answers/{id}` - Get answer by ID

## 🛠️ Technologies Used

### Frontend
- **React 19.2.4**: User interface library
- **Lucide React**: Icon library
- **React Icons**: Additional icon set
- **Axios**: HTTP client
- **CSS3**: Modern styling with CSS variables and Grid/Flexbox

### Backend
- **Spring Boot 3.2.5**: Framework for building Java applications
- **Spring Data JPA**: Database abstraction layer
- **H2 Database**: In-memory relational database
- **Lombok**: Reduce boilerplate code
- **Java 21**: Latest Java features

## 📝 Usage Guide

### For Students
1. Start the backend server
2. Start the frontend development server
3. Select a language/topic (Java, Spring Boot, or SQL)
4. Browse subtopics and read their descriptions
5. Filter by experience level to focus on your skill level
6. Read quick answers for rapid revision
7. Click "Know More" for detailed explanations
8. Use copy buttons to save answers to clipboard

### For Developers
- Backend API follows RESTful conventions
- Frontend uses component-based architecture
- CORS is enabled for development purposes
- Data seeding happens automatically on first run
- Database is in-memory (H2) - data resets on restart

## 🔐 Security Notes

### Current Implementation
- CORS enabled for all origins (development-friendly)
- No authentication/authorization required
- H2 database for development

### Production Recommendations
- Restrict CORS to specific origins
- Implement JWT-based authentication
- Use PostgreSQL/MySQL for production
- Add role-based access control
- Implement rate limiting
- Add HTTPS support

## 🐛 Troubleshooting

### Backend Won't Start
- Check Java version (21+)
- Verify Maven is installed
- Check for port 8080 availability
- Look for compiler errors in logs

### Frontend Won't Load
- Ensure backend is running on port 8080
- Clear browser cache
- Check for CORS errors in console
- Verify Node.js version (18+)

### No Questions Showing
- Backend must have started successfully (check DataSeeder logs)
- Check API response in Network tab (DevTools)
- Verify database is initialized

## 📈 Future Enhancements

- [ ] User accounts and progress tracking
- [ ] Mock interview mode with timer
- [ ] Code snippets and examples
- [ ] Video explanations
- [ ] Community contributions
- [ ] Mobile app (React Native)
- [ ] Spaced repetition algorithm
- [ ] Performance analytics
- [ ] Search and filter improvements
- [ ] Bookmark/favorite questions

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to:
1. Report bugs
2. Suggest new features
3. Add more interview questions
4. Improve UI/UX
5. Optimize performance

## 📧 Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

**Happy Learning! Master your interviews with InterviewPrep! 🚀**

