package org.example.config;

import org.example.model.*;
import org.example.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner initDatabase(TopicRepository topicRepo, SubtopicRepository subtopicRepo, ExperienceLevelRepository expRepo, QuestionRepository questionRepo, AnswerRepository answerRepo) {
        return args -> {
            // Experience Levels
            ExperienceLevel beginner = expRepo.save(new ExperienceLevel(null, "Beginner"));
            ExperienceLevel intermediate = expRepo.save(new ExperienceLevel(null, "Intermediate"));
            ExperienceLevel advanced = expRepo.save(new ExperienceLevel(null, "Advanced"));
            ExperienceLevel expert = expRepo.save(new ExperienceLevel(null, "Expert"));

            // Topics
            Topic java = topicRepo.save(new Topic(null, "Java", null));
            Topic springBoot = topicRepo.save(new Topic(null, "Spring Boot", null));
            Topic sql = topicRepo.save(new Topic(null, "SQL", null));

            // JAVA TOPICS
            Subtopic javaBasics = subtopicRepo.save(new Subtopic(null, "Basics", java, null));
            Subtopic javaDataTypes = subtopicRepo.save(new Subtopic(null, "Data Types", java, null));
            Subtopic javaFunctions = subtopicRepo.save(new Subtopic(null, "Functions", java, null));
            Subtopic javaPatterns = subtopicRepo.save(new Subtopic(null, "Design Patterns", java, null));
            Subtopic javaAdvanced = subtopicRepo.save(new Subtopic(null, "Advanced Topics", java, null));

            // Java Basics Questions
            Question jq1 = questionRepo.save(new Question(null, "What is Java?", javaBasics, beginner, null));
            answerRepo.save(new Answer(null, "Java is a high-level, object-oriented, platform-independent programming language.", "Java is a versatile, platform-independent, object-oriented programming language developed by Sun Microsystems in 1995. It follows the 'Write Once, Run Anywhere' (WORA) principle. Key features include strong typing, automatic memory management through garbage collection, rich standard library, and extensive framework ecosystem. Java is widely used for building enterprise-scale applications, web services, mobile apps (Android), and distributed systems.", jq1));

            Question jq2 = questionRepo.save(new Question(null, "Explain JVM, JRE, and JDK?", javaBasics, beginner, null));
            answerRepo.save(new Answer(null, "JVM executes bytecode, JRE provides runtime environment, JDK contains development tools.", "JVM (Java Virtual Machine) is an abstract machine that enables your computer to run Java programs and provides a runtime environment to execute Java bytecode. JRE (Java Runtime Environment) is a package that includes JVM and libraries needed to run Java applications. JDK (Java Development Kit) contains JRE plus development tools like compiler (javac), debugger, and other utilities needed to develop Java applications.", jq2));

            Question jq3 = questionRepo.save(new Question(null, "What is bytecode?", javaBasics, intermediate, null));
            answerRepo.save(new Answer(null, "Bytecode is intermediate code compiled from Java source code.", "Bytecode is platform-independent intermediate code generated when Java source code (.java files) is compiled by the Java compiler (javac). It is stored in .class files and can run on any platform that has a JVM installed. This enables Java's portability. Bytecode is not directly executable by the CPU but is interpreted/compiled by the JVM at runtime using Just-In-Time (JIT) compilation.", jq3));

            // Java Data Types Questions
            Question jq4 = questionRepo.save(new Question(null, "What are primitive and non-primitive data types?", javaDataTypes, beginner, null));
            answerRepo.save(new Answer(null, "Primitive types are basic types like int, boolean. Non-primitive types are classes, arrays, interfaces.", "Primitive data types in Java are: byte, short, int, long, float, double, char, boolean. These are predefined types that hold specific types of values. Non-primitive (Reference) types include classes, interfaces, and arrays. They store references to objects in memory rather than the actual values. Primitive types are faster and use stack memory, while reference types use heap memory.", jq4));

            Question jq5 = questionRepo.save(new Question(null, "Explain String immutability in Java.", javaDataTypes, intermediate, null));
            answerRepo.save(new Answer(null, "Strings in Java are immutable, meaning their value cannot be changed after creation.", "String immutability means once a String object is created, its value cannot be altered. If you try to modify a string, a new String object is created instead. This is implemented in Java by making the String class final and the character array (value) private and final. Benefits include thread safety, security (for sensitive strings like passwords), performance optimization through String interning, and use as HashMap keys. It also enables proper security in multi-threaded environments.", jq5));

            // Java Functions Questions
            Question jq6 = questionRepo.save(new Question(null, "What is method overloading?", javaFunctions, beginner, null));
            answerRepo.save(new Answer(null, "Method overloading allows multiple methods with the same name but different parameters.", "Method overloading is a feature that allows a class to have multiple methods with the same name but different parameter lists. Methods can differ in the number of parameters, type of parameters, or order of parameters. The return type alone is not enough for overloading. It enables cleaner API design and improves code readability. Example: System.out.println() is overloaded to accept different parameter types.", jq6));

            Question jq7 = questionRepo.save(new Question(null, "Explain method overriding.", javaFunctions, intermediate, null));
            answerRepo.save(new Answer(null, "Method overriding allows subclass to provide specific implementation of parent class method.", "Method overriding is a feature that allows a subclass to provide a specific implementation of a method that is already declared in its superclass. The overriding method must have the same method name, parameter list, and return type as the parent class method. Annotations like @Override help document and verify the intent. Overriding enables runtime polymorphism, one of the core OOP concepts. Rules: cannot reduce visibility, cannot throw new checked exceptions, and must match the parent method signature.", jq7));

            // Java Design Patterns Questions
            Question jq8 = questionRepo.save(new Question(null, "What is Singleton pattern?", javaPatterns, intermediate, null));
            answerRepo.save(new Answer(null, "Singleton ensures only one instance of a class exists throughout the application.", "The Singleton pattern restricts the instantiation of a class to a single object. It provides a global point of access to that instance. Implemented by making the constructor private and providing a static method to get the instance. Benefits include controlled instance creation, memory efficiency, and thread safety (if implemented correctly). Examples: Logger instances, Database connections, Spring beans with singleton scope. Concerns include testing difficulties and potential for misuse in multithreaded environments if not properly synchronized.", jq8));

            Question jq9 = questionRepo.save(new Question(null, "Explain Factory pattern.", javaPatterns, intermediate, null));
            answerRepo.save(new Answer(null, "Factory pattern creates objects without specifying exact classes to create.", "The Factory pattern provides an interface for creating objects without specifying the exact classes. It encapsulates object creation logic, making code more flexible and easier to maintain. Types include Simple Factory and Abstract Factory. Benefits include loose coupling between client and product classes, easier to add new product types, centralized object creation logic. Examples: Calendar.getInstance(), NumberFormat.getInstance(). This pattern promotes the Open/Closed Principle and makes code more maintainable.", jq9));

            // Java Advanced Questions
            Question jq10 = questionRepo.save(new Question(null, "Explain garbage collection in Java.", javaAdvanced, advanced, null));
            answerRepo.save(new Answer(null, "Garbage collection automatically frees memory by removing unreachable objects.", "Garbage Collection (GC) in Java is an automatic memory management mechanism that frees up memory occupied by objects that are no longer referenced. When an object has no references pointing to it, it becomes eligible for garbage collection. The GC runs periodically and removes such objects, preventing memory leaks. Types include Serial, Parallel, CMS (Concurrent Mark Sweep), and G1 GC. You cannot force garbage collection but can request it using System.gc(). Understanding GC is crucial for performance optimization in large applications.", jq10));

            Question jq11 = questionRepo.save(new Question(null, "What is reflection in Java?", javaAdvanced, advanced, null));
            answerRepo.save(new Answer(null, "Reflection allows inspection and modification of classes, methods, and fields at runtime.", "Reflection is a feature that allows Java programs to examine and modify the structure and behavior of classes, methods, fields, and interfaces at runtime. Using the Reflection API, you can get information about class members, create instances dynamically, invoke methods, access/modify fields, even private ones. This is powerful but should be used judiciously as it reduces performance and can break encapsulation. Used extensively in frameworks like Spring for dependency injection, Hibernate for ORM, and testing frameworks.", jq11));

            Question jq12 = questionRepo.save(new Question(null, "Explain multithreading and thread synchronization.", javaAdvanced, advanced, null));
            answerRepo.save(new Answer(null, "Multithreading enables concurrent execution; synchronization prevents race conditions.", "Multithreading allows a program to execute multiple threads concurrently, improving performance on multi-core systems. A thread is the smallest unit of execution. Synchronization mechanisms prevent race conditions when multiple threads access shared resources. Java provides synchronized keyword, wait/notify mechanism, and locks. Issues include deadlock, livelock, and starvation. Thread pool executors provide better management than creating threads directly. Understanding multithreading is essential for building responsive and performant applications.", jq12));

            // SPRING BOOT TOPICS
            Subtopic springBasics = subtopicRepo.save(new Subtopic(null, "Basics", springBoot, null));
            Subtopic springDependency = subtopicRepo.save(new Subtopic(null, "Dependency Injection", springBoot, null));
            Subtopic springDataAccess = subtopicRepo.save(new Subtopic(null, "Data Access", springBoot, null));
            Subtopic springREST = subtopicRepo.save(new Subtopic(null, "REST APIs", springBoot, null));
            Subtopic springSecurity = subtopicRepo.save(new Subtopic(null, "Security", springBoot, null));

            // Spring Boot Basics
            Question sq1 = questionRepo.save(new Question(null, "What is Spring Boot?", springBasics, beginner, null));
            answerRepo.save(new Answer(null, "Spring Boot is a framework that simplifies Spring application development with auto-configuration.", "Spring Boot makes it easy to create production-ready Spring applications with minimal configuration. It provides auto-configuration, embedded servers (Tomcat, Jetty), starter dependencies for quick project setup, and production-ready features like metrics and monitoring. It follows convention over configuration principle, reducing boilerplate code. Spring Boot enables rapid development of microservices and standalone applications with just a few annotations and configuration properties.", sq1));

            Question sq2 = questionRepo.save(new Question(null, "Explain Spring Boot auto-configuration.", springBasics, beginner, null));
            answerRepo.save(new Answer(null, "Auto-configuration automatically configures Spring application based on jar dependencies on classpath.", "Spring Boot auto-configuration attempts to guess and configure Spring application based on jar dependencies present on the classpath. It uses @ConditionalOnClass, @ConditionalOnMissingBean, and similar annotations. You can use @EnableAutoConfiguration or @SpringBootApplication annotations. Auto-configuration is non-invasive and you can always define your own configuration to override it using @Configuration classes. This significantly reduces development time by eliminating manual configuration.", sq2));

            // Spring Boot Dependency Injection
            Question sq3 = questionRepo.save(new Question(null, "What is Dependency Injection?", springDependency, beginner, null));
            answerRepo.save(new Answer(null, "DI is a pattern where objects receive their dependencies from external sources.", "Dependency Injection (DI) is a design pattern that deals with how components get hold of their dependencies. The pattern involves three entities: service objects, client objects, and injector. The injector creates instances of services and injects them into clients. Benefits include loose coupling, easier testing, better code reusability, and improved maintainability. Types: Constructor Injection, Setter Injection, Interface Injection. Spring Framework is built around this pattern with @Autowired, @Inject annotations.", sq3));

            Question sq4 = questionRepo.save(new Question(null, "What is IoC container in Spring?", springDependency, intermediate, null));
            answerRepo.save(new Answer(null, "IoC container manages bean creation, lifecycle, and dependency injection in Spring applications.", "The Inversion of Control (IoC) container in Spring manages the complete lifecycle of Spring beans. It creates beans, injects dependencies, manages their lifecycle (initialization, destruction), and handles configuration. The container reads configuration from XML, Java annotations, or Java configuration classes. Key interfaces are BeanFactory (basic container) and ApplicationContext (advanced, typically used). The container follows the IoC principle where control over object creation and lifecycle is inverted to the container rather than the application code.", sq4));

            // Spring Boot Data Access
            Question sq5 = questionRepo.save(new Question(null, "What is Spring Data JPA?", springDataAccess, beginner, null));
            answerRepo.save(new Answer(null, "Spring Data JPA simplifies data access layer development with repository abstractions.", "Spring Data JPA is part of Spring Data project that makes it easy to implement JPA-based repositories. It reduces boilerplate code significantly by providing generic repository interfaces like CrudRepository, PagingAndSortingRepository. You define repository interfaces by extending these interfaces and Spring automatically provides implementations. Supports custom query methods using query derivation from method names, @Query annotation, and query methods. Includes pagination, sorting, custom queries, and batch operations support.", sq5));

            // Spring Boot REST APIs
            Question sq6 = questionRepo.save(new Question(null, "What is a REST API?", springREST, beginner, null));
            answerRepo.save(new Answer(null, "REST API uses HTTP methods to perform CRUD operations on resources identified by URLs.", "Representational State Transfer (REST) is an architectural style for designing networked applications. REST APIs use standard HTTP methods: GET (retrieve), POST (create), PUT (update), DELETE (remove). Resources are identified by URIs/URLs, and responses are typically in JSON or XML format. RESTful services are stateless, meaning each request contains all information needed. Spring provides excellent support for building REST APIs with @RestController, @RequestMapping, and related annotations. Benefits include simplicity, statelessness, scalability, and wide compatibility.", sq6));

            // SQL TOPICS
            Subtopic sqlBasics = subtopicRepo.save(new Subtopic(null, "Basics", sql, null));
            Subtopic sqlFunctions = subtopicRepo.save(new Subtopic(null, "Functions", sql, null));
            Subtopic sqlJoins = subtopicRepo.save(new Subtopic(null, "Joins", sql, null));
            Subtopic sqlAdvancedTopics = subtopicRepo.save(new Subtopic(null, "Advanced Topics", sql, null));
            Subtopic sqlPerformance = subtopicRepo.save(new Subtopic(null, "Performance & Indexing", sql, null));

            // SQL Basics
            Question sqlq1 = questionRepo.save(new Question(null, "What is SQL?", sqlBasics, beginner, null));
            answerRepo.save(new Answer(null, "SQL is Structured Query Language used to manage and query relational databases.", "SQL (Structured Query Language) is a standard language for managing and querying relational databases. It allows you to create, retrieve, update, and delete data. SQL is declarative, meaning you specify what you want, not how to get it. SQL works with major databases like MySQL, PostgreSQL, Oracle, SQL Server, SQLite. Basic operations include SELECT (retrieve), INSERT (add), UPDATE (modify), DELETE (remove), CREATE (create tables). SQL is essential for any backend developer.", sqlq1));

            Question sqlq2 = questionRepo.save(new Question(null, "Explain ACID properties.", sqlBasics, intermediate, null));
            answerRepo.save(new Answer(null, "ACID ensures reliable database transactions: Atomicity, Consistency, Isolation, Durability.", "ACID properties ensure reliable database transactions. Atomicity: transaction is all-or-nothing, either completes fully or rolls back completely. Consistency: database moves from one valid state to another. Isolation: concurrent transactions don't interfere with each other. Durability: once committed, data persists even after system failures. These properties are fundamental for data integrity in critical systems like banking and e-commerce.", sqlq2));

            // SQL Functions
            Question sqlq3 = questionRepo.save(new Question(null, "What are aggregate functions in SQL?", sqlFunctions, beginner, null));
            answerRepo.save(new Answer(null, "Aggregate functions perform calculations on multiple rows and return a single result.", "Aggregate functions in SQL perform calculations on sets of values and return a single result. Common functions include COUNT() (number of rows), SUM() (total), AVG() (average), MIN() (minimum value), MAX() (maximum value). These functions ignore NULL values by default. Often used with GROUP BY clause. Example: SELECT COUNT(*) FROM users WHERE status='active'. Aggregate functions are crucial for data analysis and reporting.", sqlq3));

            Question sqlq4 = questionRepo.save(new Question(null, "Explain LIKE operator.", sqlFunctions, beginner, null));
            answerRepo.save(new Answer(null, "LIKE operator is used for pattern matching in string searches with wildcards.", "The LIKE operator is used in WHERE clause for pattern matching in text fields. Two wildcards are used: % (matches any number of characters) and _ (matches single character). Examples: 'A%' matches strings starting with A, '%ing' matches strings ending with 'ing', '%sql%' matches strings containing 'sql'. LIKE is case-insensitive in most databases but some support LIKE BINARY for case-sensitive matching. Performance can be affected with complex patterns, so use indexes appropriately.", sqlq4));

            // SQL Joins
            Question sqlq5 = questionRepo.save(new Question(null, "Explain INNER JOIN.", sqlJoins, beginner, null));
            answerRepo.save(new Answer(null, "INNER JOIN returns records that have matching values in both tables.", "INNER JOIN returns only rows that have matching records in both tables being joined. It's the most common join type. Syntax: SELECT * FROM table1 INNER JOIN table2 ON table1.id = table2.id. Only records satisfying the join condition are included. If there's no match, the row is excluded. This is useful for combining related data from multiple tables while filtering out unrelated records.", sqlq5));

            Question sqlq6 = questionRepo.save(new Question(null, "What is the difference between LEFT JOIN and INNER JOIN?", sqlJoins, intermediate, null));
            answerRepo.save(new Answer(null, "LEFT JOIN includes all records from left table plus matching records from right table; INNER JOIN includes only matching records.", "LEFT JOIN (or LEFT OUTER JOIN) returns all records from the left table and matching records from the right table. If no match exists, NULL values are used for right table columns. INNER JOIN returns only records with matches in both tables. LEFT JOIN preserves data from the left table, useful when you want to include all records regardless of matches. Choice depends on whether you need to preserve unmatched records from the first table.", sqlq6));

            // SQL Advanced
            Question sqlq7 = questionRepo.save(new Question(null, "What are subqueries?", sqlAdvancedTopics, intermediate, null));
            answerRepo.save(new Answer(null, "Subqueries are queries within queries, used to return data for main query to use.", "A subquery (or inner query) is a query within another SQL query. The subquery provides data to the main query. Subqueries can be used in SELECT, FROM, WHERE, or HAVING clauses. Types include scalar subqueries (return one value), row subqueries, table subqueries. Correlated subqueries reference columns from the outer query. Subqueries can improve query readability and logic organization. Performance considerations: sometimes using JOINs is more efficient than subqueries.", sqlq7));

            Question sqlq8 = questionRepo.save(new Question(null, "Explain UNION and UNION ALL.", sqlAdvancedTopics, intermediate, null));
            answerRepo.save(new Answer(null, "UNION combines results from multiple queries and removes duplicates; UNION ALL keeps duplicates.", "UNION operator combines result sets from multiple SELECT queries into one. UNION removes duplicate rows from the result. UNION ALL includes all rows including duplicates, and is faster since it doesn't remove duplicates. Requirements: number of columns in queries must match, and data types must be compatible. Useful for combining data from different tables or different conditions on the same table. Example: SELECT name FROM employees UNION SELECT name FROM contractors.", sqlq8));

            // SQL Performance
            Question sqlq9 = questionRepo.save(new Question(null, "What are indexes and why are they important?", sqlPerformance, intermediate, null));
            answerRepo.save(new Answer(null, "Indexes improve query performance by allowing faster data retrieval but slow down writes.", "Database indexes are data structures that improve the speed of data retrieval operations on a table. They work like book indices, directing you to the location of specific data. Types include Primary Key indexes (unique, not null), Unique indexes, Full-text indexes, Composite indexes (on multiple columns). Benefits: faster SELECT queries and WHERE clauses. Trade-offs: slower INSERT, UPDATE, DELETE operations; require additional storage space. Indexes should be created on columns frequently used in WHERE, JOIN, and ORDER BY clauses. Over-indexing degrades performance.", sqlq9));

            Question sqlq10 = questionRepo.save(new Question(null, "What is query optimization?", sqlPerformance, advanced, null));
            answerRepo.save(new Answer(null, "Query optimization is the process of making SQL queries execute efficiently and return results quickly.", "Query optimization involves analyzing and improving SQL queries to reduce execution time and resource consumption. Techniques include: using appropriate indexes, avoiding unnecessary columns in SELECT (use specific columns, not SELECT *), using INNER JOIN instead of subqueries when possible, limiting results with WHERE clause, avoiding functions on indexed columns, using EXPLAIN to analyze query execution plans. Understanding query execution plans is crucial. Proper indexing strategy, query design, and database statistics are key to optimization. Slow queries can significantly impact application performance.", sqlq10));
        };
    }
}
