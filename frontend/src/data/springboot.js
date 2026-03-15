// ============================================================
// SPRING BOOT - Complete Interview Preparation Data
// ============================================================

const springbootTopics = [
  {
    id: 'sb-ioc-di',
    name: 'IOC & Dependency Injection',
    icon: '🔌',
    concepts: [
      {
        id: 'sb-ioc',
        title: 'Inversion of Control (IoC)',
        level: 'fresher',
        shortDesc: 'IoC is a principle where the framework controls object creation and lifecycle instead of the developer. Spring IoC Container manages beans using ApplicationContext.',
        keyPoints: [
          'IoC: framework creates and manages objects, not the developer',
          'Spring IoC Container: creates, configures, and manages beans',
          'BeanFactory: basic container (lazy initialization)',
          'ApplicationContext: advanced container (eager, events, i18n)',
          'Configuration: XML, annotations (@Component), or Java Config (@Bean)',
          'Beans are singleton by default in Spring',
          'Container reads config → creates beans → injects dependencies → manages lifecycle',
          'Loose coupling: classes depend on interfaces, not concrete implementations'
        ],
        detailed: `**Inversion of Control (IoC)** inverts the traditional flow — instead of objects creating their dependencies, the container provides them. This achieves loose coupling.

**Spring IoC Container** manages the complete lifecycle of beans:
1. Read configuration (annotations, XML, Java config)
2. Create bean instances
3. Inject dependencies
4. Initialize beans (PostConstruct, InitializingBean)
5. Beans are ready for use
6. Destroy beans on shutdown (PreDestroy, DisposableBean)`,
        examples: [
          {
            title: 'IoC — Traditional vs Spring',
            type: 'code',
            language: 'java',
            code: `// ❌ Without IoC — tight coupling
class OrderService {
    private EmailService emailService = new EmailService(); // Creates dependency
    private PaymentGateway gateway = new StripeGateway();   // Hard-coded
}

// ✅ With Spring IoC — loose coupling
@Service
class OrderService {
    private final NotificationService notificationService;  // Interface
    private final PaymentGateway gateway;                   // Interface

    @Autowired // Constructor injection (preferred)
    OrderService(NotificationService ns, PaymentGateway gw) {
        this.notificationService = ns;
        this.gateway = gw;
    }
}

// Spring creates and injects the right implementations
@Service class EmailNotificationService implements NotificationService { }
@Service class StripePaymentGateway implements PaymentGateway { }`,
            explanation: 'Without IoC, classes create their own dependencies (tight coupling). With Spring IoC, the container injects dependencies (loose coupling).'
          }
        ]
      },
      {
        id: 'sb-di-types',
        title: 'Dependency Injection Types',
        level: 'fresher',
        shortDesc: 'Constructor injection (recommended), Setter injection, Field injection (@Autowired on field). Constructor ensures required dependencies; Setter for optional ones.',
        keyPoints: [
          'Constructor Injection: recommended, ensures immutability and required deps',
          'Setter Injection: for optional dependencies, allows reconfiguration',
          'Field Injection: @Autowired on field — discouraged (hard to test, hides dependencies)',
          '@Autowired: auto-wires by type. Optional since Spring 4.3 for single constructor',
          '@Qualifier: resolve ambiguity when multiple beans of same type exist',
          '@Primary: mark one bean as default when multiple candidates exist',
          'Constructor injection enables final fields (immutability)',
          'Constructor injection makes dependencies explicit in the constructor signature'
        ],
        detailed: `**Constructor Injection (Recommended):**
- Dependencies declared as constructor parameters
- Enables immutable (final) fields
- Makes required dependencies explicit
- Easy to unit test (just pass mocks to constructor)

**Setter Injection:**
- Dependencies set via setter methods
- Good for optional dependencies
- Allows re-injection

**Field Injection (Avoid):**
- @Autowired directly on field
- Hides dependencies, hard to test
- Can't make fields final`,
        examples: [
          {
            title: 'DI Types Comparison',
            type: 'code',
            language: 'java',
            code: `// ✅ Constructor Injection (RECOMMENDED)
@Service
public class UserService {
    private final UserRepository repository;
    private final EmailService emailService;

    // @Autowired optional for single constructor (Spring 4.3+)
    public UserService(UserRepository repo, EmailService email) {
        this.repository = repo;
        this.emailService = email;
    }
}

// Setter Injection (optional dependencies)
@Service
public class ReportService {
    private CacheService cache;

    @Autowired(required = false)  // Optional
    public void setCacheService(CacheService cache) {
        this.cache = cache;
    }
}

// ❌ Field Injection (avoid)
@Service
public class BadService {
    @Autowired  // Hidden dependency, can't make final, hard to test
    private UserRepository repository;
}

// @Qualifier & @Primary
@Primary
@Service("emailNotifier")
class EmailNotifier implements Notifier { }

@Service("smsNotifier")
class SMSNotifier implements Notifier { }

@Service
class AlertService {
    AlertService(@Qualifier("smsNotifier") Notifier notifier) { }
}`,
            explanation: 'Constructor injection is preferred — it ensures required dependencies, enables immutability (final), and makes testing straightforward.'
          }
        ]
      }
    ]
  },

  {
    id: 'sb-beans',
    name: 'Beans & Bean Lifecycle',
    icon: '🫘',
    concepts: [
      {
        id: 'sb-bean-scopes',
        title: 'Bean Scopes',
        level: 'junior',
        shortDesc: 'singleton (default, one per container), prototype (new per request), request (one per HTTP request), session (one per HTTP session), application, websocket.',
        keyPoints: [
          'singleton (default): one instance per Spring container',
          'prototype: new instance every time bean is requested',
          'request: one instance per HTTP request (web only)',
          'session: one instance per HTTP session (web only)',
          'application: one instance per ServletContext',
          'websocket: one instance per WebSocket session',
          '@Scope("prototype") to change from default singleton',
          'Singleton beans are eagerly created; prototype beans are lazy',
          'Injecting prototype into singleton requires Provider or ObjectFactory',
          'Caution: singleton holding prototype reference gets same instance always'
        ],
        detailed: `Spring beans have different scopes that control how many instances are created and their lifecycle.

**Singleton vs Prototype:**
- Singleton: Container creates one instance at startup, reuses it everywhere. Good for stateless services.
- Prototype: Container creates a new instance each time the bean is requested. Good for stateful beans.

**Web Scopes (require web-aware context):**
- Request: new bean for each HTTP request
- Session: new bean for each user session
- Application: one bean per ServletContext`,
        examples: [
          {
            title: 'Bean Scopes',
            type: 'code',
            language: 'java',
            code: `@Component
@Scope("singleton")  // Default — one per container
public class AppConfig { }

@Component
@Scope("prototype")  // New instance each time
public class ShoppingCart { }

@Component
@RequestScope  // One per HTTP request
public class RequestLogger { }

@Component
@SessionScope  // One per HTTP session
public class UserSession { }

// Problem: Singleton holding Prototype
@Service
public class OrderService {  // Singleton
    @Autowired
    private ShoppingCart cart;  // ⚠️ Same cart instance always!
}

// Solution: Use Provider or ObjectFactory
@Service
public class OrderService {
    private final ObjectProvider<ShoppingCart> cartProvider;

    public OrderService(ObjectProvider<ShoppingCart> cartProvider) {
        this.cartProvider = cartProvider;
    }

    public void process() {
        ShoppingCart cart = cartProvider.getObject();  // New instance!
    }
}`,
            explanation: 'Singleton is default and most common. Use prototype for stateful beans. Be careful when injecting prototype beans into singletons.'
          }
        ]
      },
      {
        id: 'sb-bean-lifecycle',
        title: 'Bean Lifecycle',
        level: 'mid',
        shortDesc: 'Instantiation → Populate properties → BeanNameAware → BeanFactoryAware → ApplicationContextAware → @PostConstruct → InitializingBean → custom init → Ready → @PreDestroy → DisposableBean → custom destroy.',
        keyPoints: [
          '1. Instantiation: container creates bean instance',
          '2. Populate properties: dependency injection happens',
          '3. Aware interfaces: BeanNameAware, BeanFactoryAware, ApplicationContextAware',
          '4. BeanPostProcessor.postProcessBeforeInitialization()',
          '5. @PostConstruct method executes',
          '6. InitializingBean.afterPropertiesSet()',
          '7. Custom init-method (from @Bean annotation)',
          '8. BeanPostProcessor.postProcessAfterInitialization()',
          '9. Bean is READY for use',
          '10. @PreDestroy on container shutdown',
          '11. DisposableBean.destroy()',
          '12. Custom destroy-method'
        ],
        detailed: `The Spring Bean lifecycle has several stages from creation to destruction. Understanding this helps in debugging initialization issues and managing resources.

**Initialization Order:**
1. Constructor → 2. Field injection → 3. Setter injection → 4. Aware interfaces → 5. @PostConstruct → 6. InitializingBean → 7. init-method

**Destruction Order:**
1. @PreDestroy → 2. DisposableBean.destroy() → 3. destroy-method

**BeanPostProcessor:** A powerful extension point that can modify beans before and after initialization. AOP proxies are created here.`,
        examples: [
          {
            title: 'Bean Lifecycle Hooks',
            type: 'code',
            language: 'java',
            code: `@Component
public class DatabaseConnection implements InitializingBean, DisposableBean,
        BeanNameAware, ApplicationContextAware {

    private String beanName;

    @Override
    public void setBeanName(String name) {       // Step 3: Aware
        this.beanName = name;
        System.out.println("1. BeanNameAware: " + name);
    }

    @Override
    public void setApplicationContext(ApplicationContext ctx) {
        System.out.println("2. ApplicationContextAware");
    }

    @PostConstruct                                // Step 5
    public void postConstruct() {
        System.out.println("3. @PostConstruct — init resources");
    }

    @Override
    public void afterPropertiesSet() {            // Step 6
        System.out.println("4. InitializingBean.afterPropertiesSet()");
    }

    @PreDestroy                                   // Step 10
    public void preDestroy() {
        System.out.println("5. @PreDestroy — cleanup");
    }

    @Override
    public void destroy() {                       // Step 11
        System.out.println("6. DisposableBean.destroy()");
    }
}

// Using @Bean with init/destroy methods
@Configuration
class AppConfig {
    @Bean(initMethod = "init", destroyMethod = "cleanup")
    public DataSource dataSource() {
        return new HikariDataSource();
    }
}`,
            explanation: '@PostConstruct and @PreDestroy are the most common lifecycle hooks. Use them for initialization and cleanup logic.'
          }
        ]
      }
    ]
  },

  {
    id: 'sb-stereotypes',
    name: 'Stereotypes & Annotations',
    icon: '🏷️',
    concepts: [
      {
        id: 'sb-stereotypes',
        title: 'Stereotype Annotations',
        level: 'fresher',
        shortDesc: '@Component (generic), @Service (business logic), @Repository (data access + exception translation), @Controller (web MVC), @RestController (REST API).',
        keyPoints: [
          '@Component: generic Spring-managed bean',
          '@Service: business logic layer (semantic only, no extra behavior)',
          '@Repository: data access layer (adds exception translation to DataAccessException)',
          '@Controller: web MVC controller (returns views)',
          '@RestController: @Controller + @ResponseBody (returns JSON/XML)',
          'All are specializations of @Component',
          '@ComponentScan scans packages for these annotations',
          '@SpringBootApplication includes @ComponentScan for current package and below',
          'Use appropriate stereotype for semantic clarity and layer separation'
        ],
        detailed: `**Stereotype Annotations** are specializations of @Component that indicate the role of a class in the application architecture.

**Hierarchy:** @Component ← @Service, @Repository, @Controller, @RestController

**Why different annotations?**
- Semantic clarity: instantly know a class's purpose
- @Repository: adds persistence exception translation
- @Controller/@RestController: marks web request handlers
- @Service: pure semantic — no extra behavior (yet may in future)`,
        examples: [
          {
            title: 'Layered Architecture with Stereotypes',
            type: 'code',
            language: 'java',
            code: `// Controller Layer — handles HTTP requests
@RestController  // = @Controller + @ResponseBody
@RequestMapping("/api/users")
public class UserController {
    private final UserService service;
    UserController(UserService service) { this.service = service; }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }
}

// Service Layer — business logic
@Service
public class UserService {
    private final UserRepository repository;
    UserService(UserRepository repository) { this.repository = repository; }

    public User findById(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new UserNotFoundException(id));
    }
}

// Repository Layer — data access
@Repository  // Adds exception translation (SQLException → DataAccessException)
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.active = true")
    List<User> findAllActive();
}

// Generic component
@Component
public class EmailValidator {
    public boolean isValid(String email) {
        return email.matches("^[\\\\w.-]+@[\\\\w.-]+\\\\.\\\\w+$");
    }
}`,
            explanation: '@RestController for REST APIs, @Service for business logic, @Repository for data access. This layered architecture is the standard Spring pattern.'
          }
        ]
      },
      {
        id: 'sb-springboot-app',
        title: '@SpringBootApplication & Auto-Configuration',
        level: 'fresher',
        shortDesc: '@SpringBootApplication = @Configuration + @EnableAutoConfiguration + @ComponentScan. Auto-configuration conditionally configures beans based on classpath and properties.',
        keyPoints: [
          '@SpringBootApplication: combines 3 annotations',
          '@Configuration: marks class as source of bean definitions',
          '@EnableAutoConfiguration: auto-configures beans based on classpath',
          '@ComponentScan: scans current package and sub-packages',
          'Auto-configuration uses @ConditionalOnClass, @ConditionalOnMissingBean',
          'spring.factories / META-INF/spring/org.springframework...AutoConfiguration.imports',
          'Exclude auto-config: @SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})',
          'application.properties/yml for configuration',
          'SpringApplication.run() bootstraps the application'
        ],
        detailed: `**@SpringBootApplication** is a convenience annotation that combines:
1. **@Configuration:** This class can define @Bean methods
2. **@EnableAutoConfiguration:** Spring Boot auto-configures based on what's on the classpath (e.g., if H2 is on classpath, it auto-configures an in-memory database)
3. **@ComponentScan:** Scans for @Component, @Service, @Repository, @Controller in current package and below

**Auto-Configuration** works by checking conditions:
- @ConditionalOnClass: configure if class is on classpath
- @ConditionalOnMissingBean: configure only if no custom bean is defined
- @ConditionalOnProperty: configure if property has specific value`,
        examples: [
          {
            title: 'Spring Boot Application Setup',
            type: 'code',
            language: 'java',
            code: `@SpringBootApplication  // = @Configuration + @EnableAutoConfiguration + @ComponentScan
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}

// Excluding auto-configuration
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class NoDbApp { }

// Custom auto-configuration
@Configuration
@ConditionalOnClass(RedisTemplate.class)
@ConditionalOnProperty(name = "cache.enabled", havingValue = "true")
public class CacheAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public CacheManager cacheManager(RedisConnectionFactory factory) {
        return RedisCacheManager.builder(factory).build();
    }
}

// application.yml
// server:
//   port: 8080
// spring:
//   datasource:
//     url: jdbc:mysql://localhost:3306/mydb
//   jpa:
//     hibernate:
//       ddl-auto: update`,
            explanation: '@SpringBootApplication bootstraps everything. Auto-configuration provides sensible defaults that you can override with your own beans or properties.'
          }
        ]
      },
      {
        id: 'sb-common-annotations',
        title: 'Common Spring Annotations',
        level: 'junior',
        shortDesc: '@Value, @ConfigurationProperties, @Profile, @ConditionalOn*, @Lazy, @Order, @EventListener, @Async, @Scheduled, @Cacheable, @Transactional, @Valid.',
        keyPoints: [
          '@Value("$\\{prop.name}"): inject property values', // eslint-disable-line no-template-curly-in-string
          '@ConfigurationProperties(prefix): bind group of properties to POJO',
          '@Profile("dev"): activate bean only for specific profile',
          '@ConditionalOnProperty: conditional bean creation',
          '@Lazy: defer bean creation until first access',
          '@Order: control bean processing order',
          '@EventListener: handle application events',
          '@Async: execute method asynchronously',
          '@Scheduled(fixedRate/cron): schedule periodic tasks',
          '@Cacheable: cache method results',
          '@Transactional: manage database transactions'
        ],
        detailed: `Spring provides a rich set of annotations for various aspects of application development.

**Configuration:** @Value, @ConfigurationProperties, @Profile, @PropertySource
**Conditional:** @ConditionalOnProperty, @ConditionalOnClass, @ConditionalOnMissingBean, @ConditionalOnExpression
**Lifecycle:** @Lazy, @Order, @DependsOn
**Async/Scheduling:** @Async, @Scheduled, @EnableAsync, @EnableScheduling
**Caching:** @Cacheable, @CacheEvict, @CachePut, @EnableCaching
**Transactions:** @Transactional, @Modifying`,
        examples: [
          {
            title: 'Annotation Showcase',
            type: 'code',
            language: 'java',
            code: `// @ConfigurationProperties — type-safe config
@ConfigurationProperties(prefix = "app.mail")
@Component
public class MailProperties {
    private String host;
    private int port;
    private String username;
    // getters, setters
}
// app.mail.host=smtp.gmail.com in application.properties

// @Profile — environment-specific beans
@Service
@Profile("dev")
class MockPaymentService implements PaymentService { }

@Service
@Profile("prod")
class StripePaymentService implements PaymentService { }

// @Async — async execution
@Service
public class NotificationService {
    @Async
    public CompletableFuture<Void> sendEmail(String to) {
        // Runs in separate thread
        return CompletableFuture.completedFuture(null);
    }
}

// @Scheduled — periodic tasks
@Component
public class CleanupTask {
    @Scheduled(fixedRate = 60000)  // Every 60 seconds
    public void cleanup() { /* ... */ }

    @Scheduled(cron = "0 0 2 * * ?")  // Daily at 2 AM
    public void nightlyJob() { /* ... */ }
}

// @Cacheable
@Cacheable(value = "users", key = "#id")
public User findById(Long id) { return repository.findById(id).orElseThrow(); }`,
            explanation: 'Spring annotations provide declarative configuration for profiles, scheduling, caching, async processing, and more.'
          }
        ]
      }
    ]
  },

  {
    id: 'sb-rest',
    name: 'REST API & Controllers',
    icon: '🌐',
    concepts: [
      {
        id: 'sb-rest-api',
        title: 'REST API & Request Mappings',
        level: 'fresher',
        shortDesc: '@RestController handles REST requests. @GetMapping, @PostMapping, @PutMapping, @DeleteMapping. @PathVariable, @RequestParam, @RequestBody for input binding.',
        keyPoints: [
          '@RestController = @Controller + @ResponseBody',
          '@RequestMapping: maps URL to class/method (all HTTP methods)',
          '@GetMapping: GET requests (retrieve data)',
          '@PostMapping: POST requests (create data)',
          '@PutMapping: PUT requests (update entire resource)',
          '@PatchMapping: PATCH requests (partial update)',
          '@DeleteMapping: DELETE requests (remove data)',
          '@PathVariable: extract value from URL path (/users/{id})',
          '@RequestParam: extract query parameters (?name=value)',
          '@RequestBody: bind JSON body to Java object',
          '@RequestHeader: extract HTTP header values',
          'ResponseEntity: control status code, headers, and body'
        ],
        detailed: `**RESTful API Design with Spring Boot:**

REST (Representational State Transfer) uses HTTP methods to perform CRUD operations:
- **GET** /api/users — List all users
- **GET** /api/users/{id} — Get user by ID
- **POST** /api/users — Create user
- **PUT** /api/users/{id} — Update user
- **DELETE** /api/users/{id} — Delete user

**ResponseEntity** gives full control over HTTP response (status code, headers, body).`,
        examples: [
          {
            title: 'Complete REST Controller',
            type: 'code',
            language: 'java',
            code: `@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService service;
    ProductController(ProductService service) { this.service = service; }

    @GetMapping                                    // GET /api/v1/products
    public List<Product> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return service.findAll(page, size);
    }

    @GetMapping("/{id}")                           // GET /api/v1/products/5
    public ResponseEntity<Product> getById(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping                                   // POST /api/v1/products
    public ResponseEntity<Product> create(
            @Valid @RequestBody ProductRequest request) {
        Product created = service.create(request);
        URI location = URI.create("/api/v1/products/" + created.getId());
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")                           // PUT /api/v1/products/5
    public ResponseEntity<Product> update(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/{id}")                        // DELETE /api/v1/products/5
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}`,
            explanation: 'This shows a complete CRUD REST controller with proper HTTP methods, status codes, and input binding annotations.'
          }
        ]
      },
      {
        id: 'sb-versioning',
        title: 'API Versioning Strategies',
        level: 'mid',
        shortDesc: 'URL path (/api/v1/), query param (?version=1), header (X-API-Version: 1), content type (Accept: application/vnd.api.v1+json). URL versioning is most common.',
        keyPoints: [
          'URL Path: /api/v1/users — most common, simple, cacheable',
          'Query Parameter: /api/users?version=1 — flexible',
          'Header: X-API-Version: 1 — clean URLs, harder to test',
          'Content Negotiation: Accept: application/vnd.company.v1+json',
          'URL versioning is most widely adopted (GitHub, Twitter, Google)',
          'Version when breaking changes occur',
          'Support at least 2 versions simultaneously',
          'Document deprecation timeline'
        ],
        detailed: `API versioning ensures backward compatibility when making breaking changes.

**Strategies:**
1. **URL Path** (recommended): \`/api/v1/users\`, \`/api/v2/users\`
2. **Query Parameter:** \`/api/users?version=1\`
3. **Custom Header:** \`X-API-Version: 1\`
4. **Content Negotiation:** \`Accept: application/vnd.company.v1+json\``,
        examples: [
          {
            title: 'Versioning Approaches',
            type: 'code',
            language: 'java',
            code: `// URL Path Versioning (most common)
@RestController
@RequestMapping("/api/v1/users")
class UserControllerV1 {
    @GetMapping("/{id}")
    UserV1 getUser(@PathVariable Long id) { return ...; }
}

@RestController
@RequestMapping("/api/v2/users")
class UserControllerV2 {
    @GetMapping("/{id}")
    UserV2 getUser(@PathVariable Long id) { return ...; }
}

// Header Versioning
@RestController
@RequestMapping("/api/users")
class UserController {
    @GetMapping(value = "/{id}", headers = "X-API-Version=1")
    UserV1 getUserV1(@PathVariable Long id) { return ...; }

    @GetMapping(value = "/{id}", headers = "X-API-Version=2")
    UserV2 getUserV2(@PathVariable Long id) { return ...; }
}

// Content Negotiation Versioning
@GetMapping(value = "/{id}", produces = "application/vnd.company.v1+json")
UserV1 getUserV1(@PathVariable Long id) { return ...; }

@GetMapping(value = "/{id}", produces = "application/vnd.company.v2+json")
UserV2 getUserV2(@PathVariable Long id) { return ...; }`,
            explanation: 'URL path versioning is the most common and easiest to implement. Choose a strategy and be consistent across your API.'
          }
        ]
      }
    ]
  },

  {
    id: 'sb-jpa-hibernate',
    name: 'JPA & Hibernate',
    icon: '🗄️',
    concepts: [
      {
        id: 'sb-jpa',
        title: 'JPA & Spring Data JPA',
        level: 'junior',
        shortDesc: 'JPA is the specification, Hibernate is the implementation. Spring Data JPA provides repository abstraction with auto-generated queries from method names.',
        keyPoints: [
          'JPA (Jakarta Persistence API): ORM specification (not implementation)',
          'Hibernate: most popular JPA implementation',
          'Spring Data JPA: repository abstraction layer on top of JPA',
          'JpaRepository: CRUD + pagination + sorting out of the box',
          'Derived queries: findByNameAndAge() auto-generates SQL',
          '@Query: custom JPQL or native SQL queries',
          '@Entity: marks class as JPA entity (maps to DB table)',
          '@Id + @GeneratedValue: primary key',
          '@OneToMany, @ManyToOne, @ManyToMany, @OneToOne: relationships',
          'EntityManager: JPA\'s core API for persistence operations'
        ],
        detailed: `**JPA** is a specification that defines how Java objects map to relational database tables. It provides annotations for entity mapping and a query language (JPQL).

**Hibernate** is the most popular JPA implementation. It handles SQL generation, caching, lazy loading, and transaction management.

**Spring Data JPA** sits on top and provides:
- Repository interfaces (JpaRepository) with CRUD methods
- Query derivation from method names
- Custom queries with @Query
- Pagination and sorting
- Auditing (@CreatedDate, @LastModifiedDate)`,
        examples: [
          {
            title: 'Entity & Repository',
            type: 'code',
            language: 'java',
            code: `// Entity
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    private BigDecimal price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @CreatedDate
    private LocalDateTime createdAt;
}

// Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Derived queries — auto-generated SQL
    List<Product> findByNameContaining(String keyword);
    List<Product> findByCategoryIdAndPriceGreaterThan(Long catId, BigDecimal price);
    Optional<Product> findByNameIgnoreCase(String name);

    // Custom JPQL query
    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :min AND :max")
    List<Product> findByPriceRange(@Param("min") BigDecimal min, @Param("max") BigDecimal max);

    // Native SQL query
    @Query(value = "SELECT * FROM products WHERE name LIKE %:keyword%", nativeQuery = true)
    List<Product> searchByKeyword(@Param("keyword") String keyword);

    // Pagination
    Page<Product> findByCategory(Category cat, Pageable pageable);
}

// Usage in Service
Page<Product> page = repository.findByCategory(cat, PageRequest.of(0, 10, Sort.by("price")));`,
            explanation: 'Spring Data JPA generates SQL from method names. Use @Query for complex queries. JpaRepository provides CRUD, paging, and sorting.'
          }
        ]
      },
      {
        id: 'sb-n-plus-1',
        title: 'Hibernate N+1 Problem',
        level: 'mid',
        shortDesc: '1 query loads parent entities + N queries load related entities individually. Fix: JOIN FETCH, @EntityGraph, @BatchSize, or DTO projections.',
        keyPoints: [
          'N+1: 1 query for parents + N queries for each child (lazy loading)',
          'Caused by accessing lazy-loaded relationships in a loop',
          'Fix 1: JOIN FETCH in JPQL — loads everything in one query',
          'Fix 2: @EntityGraph — declarative eager loading per query',
          'Fix 3: @BatchSize — loads children in batches (reduces N to N/batchSize)',
          'Fix 4: DTO projections — select only needed fields',
          'FetchType.LAZY is default for @OneToMany, @ManyToMany',
          'FetchType.EAGER loads everything upfront (not always good)',
          'Use spring.jpa.show-sql=true to detect N+1 issues',
          'Hibernate statistics: hibernate.generate_statistics=true'
        ],
        detailed: `**The N+1 Problem** occurs when Hibernate executes 1 query to load a list of entities, then N additional queries to load a related entity for each one.

**Example:** Loading 100 Orders → 1 query for orders + 100 queries for each order's customer = 101 queries!

**Solutions:**
1. **JOIN FETCH:** Single query with JOIN
2. **@EntityGraph:** Declarative fetch plan
3. **@BatchSize:** Fetch related entities in batches
4. **DTO Projection:** Select only needed columns`,
        examples: [
          {
            title: 'N+1 Problem & Solutions',
            type: 'code',
            language: 'java',
            code: `// ❌ N+1 Problem
List<Order> orders = orderRepo.findAll();  // 1 query
for (Order order : orders) {
    order.getCustomer().getName();         // N queries! (lazy loading each customer)
}

// ✅ Fix 1: JOIN FETCH
@Query("SELECT o FROM Order o JOIN FETCH o.customer")
List<Order> findAllWithCustomer();  // 1 query!

// ✅ Fix 2: @EntityGraph
@EntityGraph(attributePaths = {"customer", "items"})
List<Order> findAll();  // 1 query with JOIN

// ✅ Fix 3: @BatchSize
@Entity
class Order {
    @ManyToOne(fetch = FetchType.LAZY)
    @BatchSize(size = 25)  // Load customers in batches of 25
    private Customer customer;
}

// ✅ Fix 4: DTO Projection (no entity overhead)
@Query("SELECT new com.app.dto.OrderSummary(o.id, o.total, c.name) " +
       "FROM Order o JOIN o.customer c")
List<OrderSummary> findOrderSummaries();

// Detection: enable SQL logging
// spring.jpa.show-sql=true
// spring.jpa.properties.hibernate.format_sql=true`,
            explanation: 'JOIN FETCH is the most common fix. Use @EntityGraph for flexible fetching. DTO projections are best for read-only queries.'
          }
        ]
      },
      {
        id: 'sb-transactional',
        title: '@Transactional & @Modifying',
        level: 'mid',
        shortDesc: '@Transactional manages DB transaction boundaries. Propagation: REQUIRED (default), REQUIRES_NEW, etc. @Modifying for UPDATE/DELETE queries in JPA.',
        keyPoints: [
          '@Transactional: marks method/class for transaction management',
          'Default propagation: REQUIRED (join existing or create new)',
          'REQUIRES_NEW: always creates new transaction (suspends existing)',
          'SUPPORTS: runs in transaction if exists, else without',
          'readOnly = true: optimization hint for read operations',
          'rollbackFor: specify exceptions that trigger rollback',
          'By default: rollback on unchecked exceptions, commit on checked',
          '@Modifying: required for @Query with UPDATE/DELETE statements',
          '@Modifying(clearAutomatically = true): clears persistence context after',
          '@Transactional works via AOP proxy — internal calls bypass it!'
        ],
        detailed: `**@Transactional** uses AOP proxies to manage transaction boundaries declaratively.

**Propagation Types:**
| Type | Behavior |
|------|----------|
| REQUIRED | Join existing or create new (default) |
| REQUIRES_NEW | Always create new (suspend existing) |
| SUPPORTS | Use if exists, otherwise non-transactional |
| NOT_SUPPORTED | Execute non-transactionally (suspend if exists) |
| MANDATORY | Must have existing transaction (else exception) |
| NEVER | Must NOT have transaction (else exception) |

**Common Pitfall:** @Transactional only works when called from outside the class (due to AOP proxy). Internal method calls bypass the proxy!`,
        examples: [
          {
            title: 'Transaction Management',
            type: 'code',
            language: 'java',
            code: `@Service
@Transactional(readOnly = true)  // Class-level: default read-only
public class OrderService {

    @Transactional  // Override: read-write
    public Order createOrder(OrderRequest req) {
        Order order = new Order(req);
        orderRepo.save(order);
        inventoryService.reduceStock(req.getItems()); // Same transaction
        return order;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW,
                   rollbackFor = Exception.class,
                   timeout = 30)
    public void processPayment(Long orderId) {
        // Always in its own transaction — independent rollback
    }

    public List<Order> findAll() {
        return orderRepo.findAll(); // Read-only (from class-level)
    }
}

// @Modifying for UPDATE/DELETE queries
public interface UserRepository extends JpaRepository<User, Long> {
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.active = false WHERE u.lastLogin < :date")
    int deactivateInactiveUsers(@Param("date") LocalDate date);

    @Modifying(clearAutomatically = true)
    @Query("DELETE FROM User u WHERE u.active = false")
    void deleteInactiveUsers();
}

// ⚠️ Pitfall: internal call bypasses proxy
@Service
class ServiceA {
    @Transactional
    public void methodA() { }

    public void methodB() {
        methodA(); // ❌ @Transactional NOT applied (internal call)
    }
}`,
            explanation: '@Transactional handles commit/rollback automatically. @Modifying is required for write queries. Watch out for the internal call pitfall!'
          }
        ]
      }
    ]
  },

  {
    id: 'sb-security',
    name: 'Security (JWT, OAuth, Filters)',
    icon: '🔐',
    concepts: [
      {
        id: 'sb-spring-security',
        title: 'Spring Security & JWT',
        level: 'mid',
        shortDesc: 'Spring Security provides authentication & authorization via filter chain. JWT: stateless token-based auth. Filter chain: SecurityFilterChain → UsernamePasswordAuthenticationFilter → etc.',
        keyPoints: [
          'Spring Security works through a chain of servlet filters',
          'SecurityFilterChain: configures URL patterns, auth rules, CORS, CSRF',
          'Authentication: verify identity (login). Authorization: verify permissions (roles)',
          'JWT (JSON Web Token): stateless, self-contained token (header.payload.signature)',
          'JWT flow: login → server creates JWT → client sends JWT in Authorization header',
          'Bearer token: Authorization: Bearer <jwt-token>',
          'OncePerRequestFilter: custom filter for JWT validation',
          'UserDetailsService: loads user from database',
          'BCryptPasswordEncoder: hash passwords',
          'Method security: @PreAuthorize, @Secured, @RolesAllowed'
        ],
        detailed: `**Spring Security** provides comprehensive security for Spring applications through a filter chain pattern.

**Filter Chain Flow:**
Request → CORS filter → CSRF filter → Authentication filter → Authorization filter → Controller

**JWT Authentication Flow:**
1. Client sends credentials (POST /auth/login)
2. Server validates credentials, generates JWT
3. Client stores JWT and sends in Authorization header
4. Server validates JWT on each request (stateless)

**JWT Structure:** header.payload.signature
- Header: algorithm, type
- Payload: claims (sub, iat, exp, roles)
- Signature: HMAC or RSA signed`,
        examples: [
          {
            title: 'Security Configuration & JWT',
            type: 'code',
            language: 'java',
            code: `// Security Configuration (Spring Security 6+)
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(sm -> sm.sessionCreationPolicy(STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

// JWT Filter
@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res,
                                    FilterChain chain) throws ServletException, IOException {
        String header = req.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            if (jwtUtil.validate(token)) {
                String username = jwtUtil.getUsername(token);
                var auth = new UsernamePasswordAuthenticationToken(username, null, authorities);
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }
        chain.doFilter(req, res);
    }
}

// Method-level security
@PreAuthorize("hasRole('ADMIN')")
public void deleteUser(Long id) { }

@PreAuthorize("#userId == authentication.principal.id")
public User getProfile(Long userId) { }`,
            explanation: 'SecurityFilterChain configures URL-level security. JWT filter validates tokens on each request. @PreAuthorize for method-level access control.'
          }
        ]
      },
      {
        id: 'sb-oauth2',
        title: 'OAuth2 & SSO',
        level: 'senior',
        shortDesc: 'OAuth2: authorization framework for third-party access. Flows: Authorization Code (web), Client Credentials (service-to-service), PKCE (SPA/mobile).',
        keyPoints: [
          'OAuth2: authorization framework (NOT authentication — that\'s OpenID Connect)',
          'Roles: Resource Owner, Client, Authorization Server, Resource Server',
          'Authorization Code flow: for web apps (most secure, uses redirect)',
          'Client Credentials flow: for service-to-service (no user involved)',
          'PKCE (Proof Key for Code Exchange): for SPAs and mobile apps',
          'Access Token: short-lived, used to access resources',
          'Refresh Token: long-lived, used to get new access tokens',
          'Spring Security OAuth2 Login: @EnableOAuth2Login',
          'Resource Server: validates access tokens (@EnableResourceServer)',
          'OpenID Connect (OIDC): identity layer on top of OAuth2'
        ],
        detailed: `**OAuth2** is an authorization framework that allows third-party applications to access user resources without sharing credentials.

**Common Flows:**
1. **Authorization Code + PKCE:** For web/mobile apps. Most secure.
2. **Client Credentials:** For machine-to-machine (no user context).
3. **Implicit:** Deprecated — use Auth Code + PKCE instead.

**Spring Security OAuth2 Support:**
- OAuth2 Login: Login via Google, GitHub, etc.
- OAuth2 Resource Server: Validate JWT tokens
- OAuth2 Client: Call OAuth2-protected APIs`,
        examples: [
          {
            title: 'OAuth2 Setup',
            type: 'code',
            language: 'java',
            code: `// application.yml
// spring:
//   security:
//     oauth2:
//       client:
//         registration:
//           google:
//             client-id: your-client-id
//             client-secret: your-secret
//             scope: openid, profile, email
//       resourceserver:
//         jwt:
//           issuer-uri: https://auth-server.com

// Resource Server Configuration
@Configuration
@EnableWebSecurity
public class ResourceServerConfig {
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtConverter()))
            )
            .build();
    }
}

// OAuth2 Login (Social Login)
@Configuration
public class OAuth2LoginConfig {
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .oauth2Login(oauth2 -> oauth2
                .loginPage("/login")
                .defaultSuccessUrl("/dashboard")
            )
            .build();
    }
}`,
            explanation: 'Spring Security provides built-in OAuth2 support for both resource servers (JWT validation) and OAuth2 login (social login with Google, GitHub, etc.).'
          }
        ]
      }
    ]
  },

  {
    id: 'sb-exception-handling',
    name: 'Exception Handling',
    icon: '⚠️',
    concepts: [
      {
        id: 'sb-exception-handler',
        title: '@RestControllerAdvice & @ExceptionHandler',
        level: 'junior',
        shortDesc: '@RestControllerAdvice: global exception handler for all controllers. @ExceptionHandler: handles specific exceptions. Returns consistent error responses.',
        keyPoints: [
          '@RestControllerAdvice: global exception handling (AOP-based)',
          '@ExceptionHandler: handles specific exception types',
          'Returns consistent error response (status code + message + details)',
          '@ResponseStatus: set HTTP status code for exceptions',
          'Handle specific exceptions first, generic Exception last',
          'Custom exception classes for domain errors',
          'ProblemDetail (RFC 7807): standard error response format (Spring 6)',
          'Validation errors: MethodArgumentNotValidException',
          'ResponseEntityExceptionHandler: base class with default handlers'
        ],
        detailed: `**@RestControllerAdvice** provides a centralized place to handle exceptions thrown by any controller. It works through AOP (Aspect-Oriented Programming).

**Best Practices:**
1. Create custom exceptions for domain-specific errors
2. Return consistent error response structure
3. Handle specific exceptions before generic ones
4. Include helpful error messages for API consumers
5. Use appropriate HTTP status codes`,
        examples: [
          {
            title: 'Global Exception Handler',
            type: 'code',
            language: 'java',
            code: `// Error response DTO
record ErrorResponse(int status, String message, String path, LocalDateTime timestamp) {}

// Custom exceptions
class ResourceNotFoundException extends RuntimeException {
    ResourceNotFoundException(String resource, Long id) {
        super(resource + " not found with id: " + id);
    }
}

class BusinessException extends RuntimeException {
    private final String code;
    BusinessException(String code, String message) {
        super(message); this.code = code;
    }
}

// Global exception handler
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    ErrorResponse handleNotFound(ResourceNotFoundException ex, HttpServletRequest req) {
        return new ErrorResponse(404, ex.getMessage(), req.getRequestURI(), LocalDateTime.now());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    Map<String, String> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors()
          .forEach(e -> errors.put(e.getField(), e.getDefaultMessage()));
        return errors;
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    ErrorResponse handleGeneral(Exception ex, HttpServletRequest req) {
        return new ErrorResponse(500, "Internal server error", req.getRequestURI(), LocalDateTime.now());
    }
}`,
            explanation: '@RestControllerAdvice intercepts exceptions from all controllers. Return consistent error responses with proper HTTP status codes.'
          }
        ]
      }
    ]
  },

  {
    id: 'sb-microservices',
    name: 'Microservices & Patterns',
    icon: '🏗️',
    concepts: [
      {
        id: 'sb-microservices-arch',
        title: 'Microservices Architecture',
        level: 'mid',
        shortDesc: 'Independently deployable services, each owning its data. Communicate via REST/gRPC/messaging. Patterns: API Gateway, Service Discovery, Circuit Breaker, Saga.',
        keyPoints: [
          'Each service is independently deployable and scalable',
          'Database per service (loose coupling)',
          'Communication: synchronous (REST, gRPC) or asynchronous (Kafka, RabbitMQ)',
          'API Gateway: single entry point, routing, auth, rate limiting',
          'Service Discovery: Eureka, Consul — dynamic service registration',
          'Circuit Breaker: prevent cascade failures (Resilience4j)',
          'Saga Pattern: distributed transactions across services',
          'Load Balancer: distribute traffic (Spring Cloud LoadBalancer)',
          'Config Server: centralized configuration management',
          'Distributed Tracing: Zipkin, Jaeger — trace requests across services',
          '12-Factor App principles for cloud-native design'
        ],
        detailed: `**Microservices Architecture** decomposes an application into small, independent services that communicate over the network.

**Key Components:**
1. **API Gateway:** Routes requests, handles cross-cutting concerns (Spring Cloud Gateway)
2. **Service Discovery:** Services register and discover each other (Eureka)
3. **Config Server:** Centralized configuration (Spring Cloud Config)
4. **Circuit Breaker:** Fault tolerance (Resilience4j)
5. **Message Broker:** Async communication (Kafka, RabbitMQ)

**vs Monolith:**
- Monolith: single deployable, shared DB, simpler but harder to scale
- Microservices: independent services, own DBs, complex but scalable`,
        examples: [
          {
            title: 'Microservices Spring Boot Setup',
            type: 'code',
            language: 'java',
            code: `// API Gateway (Spring Cloud Gateway)
@SpringBootApplication
public class GatewayApp { }
// application.yml:
// spring.cloud.gateway.routes:
//   - id: user-service
//     uri: lb://USER-SERVICE
//     predicates: Path=/api/users/**

// Service Discovery (Eureka Server)
@SpringBootApplication
@EnableEurekaServer
public class DiscoveryServer { }

// Eureka Client (each microservice)
@SpringBootApplication
@EnableDiscoveryClient
public class UserService { }

// Feign Client — declarative REST client
@FeignClient(name = "order-service")
public interface OrderClient {
    @GetMapping("/api/orders/user/{userId}")
    List<Order> getUserOrders(@PathVariable Long userId);
}

// Circuit Breaker (Resilience4j)
@Service
class ProductService {
    @CircuitBreaker(name = "inventory", fallbackMethod = "fallback")
    @Retry(name = "inventory", maxAttempts = 3)
    public Inventory checkStock(Long productId) {
        return inventoryClient.getStock(productId);
    }

    Inventory fallback(Long productId, Exception ex) {
        return new Inventory(productId, 0, "UNKNOWN");
    }
}`,
            explanation: 'Spring Cloud provides tools for building microservices: Gateway for routing, Eureka for discovery, Feign for REST calls, Resilience4j for fault tolerance.'
          }
        ]
      },
      {
        id: 'sb-saga-pattern',
        title: 'Saga & Circuit Breaker Patterns',
        level: 'senior',
        shortDesc: 'Saga: manage distributed transactions via choreography (events) or orchestration (coordinator). Circuit Breaker: CLOSED→OPEN→HALF_OPEN states, prevents cascade failures.',
        keyPoints: [
          'Saga: distributed transaction management without 2PC',
          'Choreography: each service publishes events, others react',
          'Orchestration: central coordinator directs the workflow',
          'Compensating transactions: undo completed steps on failure',
          'Circuit Breaker states: CLOSED (normal), OPEN (fail-fast), HALF_OPEN (testing)',
          'Resilience4j: CircuitBreaker, Retry, RateLimiter, Bulkhead, TimeLimiter',
          'Bulkhead: isolate failures, limit concurrent calls',
          'Rate Limiter: control request rate to prevent overload',
          'Fallback methods: provide default response on failure'
        ],
        detailed: `**Saga Pattern** manages data consistency across microservices without distributed transactions (which don't scale well).

**Choreography:** Services communicate via events. Each service performs its local transaction and publishes an event. Other services listen and react.

**Orchestration:** A central Saga Orchestrator tells each service what to do and handles compensation on failure.

**Circuit Breaker** prevents cascade failures by failing fast when a downstream service is unhealthy:
- CLOSED: requests flow normally
- OPEN: requests fail immediately (no calls to downstream)
- HALF_OPEN: allow some requests to test recovery`,
        examples: [
          {
            title: 'Saga & Circuit Breaker',
            type: 'code',
            language: 'java',
            code: `// Saga — Choreography with events
// Order Service
@Service
class OrderService {
    @Transactional
    public Order createOrder(OrderRequest req) {
        Order order = orderRepo.save(new Order(req, OrderStatus.PENDING));
        eventPublisher.publish(new OrderCreatedEvent(order));
        return order;
    }

    @EventListener
    void onPaymentFailed(PaymentFailedEvent event) {
        // Compensating transaction
        orderRepo.updateStatus(event.getOrderId(), OrderStatus.CANCELLED);
    }
}

// Payment Service — reacts to OrderCreated
@EventListener
void onOrderCreated(OrderCreatedEvent event) {
    try {
        processPayment(event.getOrder());
        publisher.publish(new PaymentCompletedEvent(event.getOrderId()));
    } catch (Exception e) {
        publisher.publish(new PaymentFailedEvent(event.getOrderId()));
    }
}

// Circuit Breaker with Resilience4j
@CircuitBreaker(name = "paymentService",
    fallbackMethod = "paymentFallback")
@Retry(name = "paymentService")
@TimeLimiter(name = "paymentService")
public CompletableFuture<Payment> processPayment(PaymentRequest req) {
    return CompletableFuture.supplyAsync(() -> paymentClient.process(req));
}

// application.yml:
// resilience4j.circuitbreaker.instances.paymentService:
//   failure-rate-threshold: 50
//   wait-duration-in-open-state: 5s
//   sliding-window-size: 10`,
            explanation: 'Saga manages distributed transactions with compensating actions. Circuit Breaker prevents cascade failures with configurable thresholds.'
          }
        ]
      },
      {
        id: 'sb-messaging-kafka',
        title: 'Messaging (Kafka & Async)',
        level: 'mid',
        shortDesc: 'Apache Kafka: distributed event streaming. Produce messages to topics, consumers read from partitions. @Async for async method execution. RabbitMQ for traditional messaging.',
        keyPoints: [
          'Kafka: distributed, high-throughput, persistent message streaming',
          'Topics: named channels for messages. Partitions: parallel processing units',
          'Producer: publishes messages. Consumer: reads messages from topics',
          'Consumer Groups: distribute partitions among consumers for scaling',
          'KafkaTemplate: send messages. @KafkaListener: receive messages',
          '@Async: execute methods in background thread pool',
          '@EnableAsync: enable async processing',
          'RabbitMQ: traditional message broker (exchanges, queues, bindings)',
          'CompletableFuture return type for async methods',
          'Event-driven architecture: loose coupling between services'
        ],
        detailed: `**Apache Kafka** is a distributed event streaming platform used for building real-time data pipelines and event-driven microservices.

**Key Concepts:**
- **Topic:** Category/feed of messages
- **Partition:** Ordered, immutable sequence of messages within a topic
- **Offset:** Position of a message in a partition
- **Consumer Group:** Set of consumers sharing message consumption

**Spring Kafka** provides KafkaTemplate for producing and @KafkaListener for consuming.

**@Async** enables simple asynchronous method execution using a thread pool.`,
        examples: [
          {
            title: 'Kafka Producer & Consumer',
            type: 'code',
            language: 'java',
            code: `// Kafka Producer
@Service
public class OrderEventProducer {
    private final KafkaTemplate<String, OrderEvent> kafkaTemplate;

    public void publishOrderCreated(Order order) {
        OrderEvent event = new OrderEvent("CREATED", order);
        kafkaTemplate.send("order-events", order.getId().toString(), event);
    }
}

// Kafka Consumer
@Service
public class InventoryConsumer {
    @KafkaListener(topics = "order-events", groupId = "inventory-group")
    public void handleOrderEvent(OrderEvent event) {
        if ("CREATED".equals(event.getType())) {
            inventoryService.reserve(event.getOrder().getItems());
        }
    }
}

// @Async — simple async execution
@Service
public class EmailService {
    @Async("emailExecutor")  // Custom thread pool
    public CompletableFuture<Void> sendEmail(String to, String body) {
        // Runs in background thread
        mailer.send(to, body);
        return CompletableFuture.completedFuture(null);
    }
}

@Configuration
@EnableAsync
class AsyncConfig {
    @Bean("emailExecutor")
    Executor emailExecutor() {
        var exec = new ThreadPoolTaskExecutor();
        exec.setCorePoolSize(5);
        exec.setMaxPoolSize(10);
        exec.setQueueCapacity(25);
        return exec;
    }
}`,
            explanation: 'Kafka enables event-driven communication between microservices. @Async provides simple async processing for independent tasks like sending emails.'
          }
        ]
      }
    ]
  },

  {
    id: 'sb-caching-redis',
    name: 'Caching & Redis',
    icon: '⚡',
    concepts: [
      {
        id: 'sb-redis',
        title: 'Redis Cache & Spring Cache',
        level: 'mid',
        shortDesc: 'Redis: in-memory data store for caching, sessions, queues. @Cacheable: cache method results. @CacheEvict: remove cache. @CachePut: update cache.',
        keyPoints: [
          'Redis: in-memory key-value store (strings, hashes, lists, sets)',
          '@EnableCaching: enable Spring cache abstraction',
          '@Cacheable: cache method return value (checks cache before executing)',
          '@CacheEvict: remove entries from cache',
          '@CachePut: update cache without skipping method execution',
          '@Caching: combine multiple cache annotations',
          'Cache key: derived from method parameters by default',
          'TTL (Time to Live): expire cache entries after time',
          'RedisTemplate: low-level Redis operations',
          'Spring Session with Redis: distributed session management'
        ],
        detailed: `**Redis** is an in-memory data store used as cache, message broker, and session store. It supports various data structures: strings, hashes, lists, sets, sorted sets.

**Spring Cache Abstraction** provides annotations for transparent caching:
- @Cacheable: Checks cache first, executes method only on cache miss
- @CacheEvict: Removes entry from cache (on update/delete)
- @CachePut: Always executes method and updates cache

**Cache Strategies:**
- Cache-aside: Application manages cache (most common with Spring)
- Write-through: Write to cache and DB simultaneously
- Write-behind: Write to cache, async write to DB`,
        examples: [
          {
            title: 'Spring Cache with Redis',
            type: 'code',
            language: 'java',
            code: `// Configuration
@Configuration
@EnableCaching
public class CacheConfig {
    @Bean
    public RedisCacheManager cacheManager(RedisConnectionFactory factory) {
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(30))
            .serializeValuesWith(SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer()));

        return RedisCacheManager.builder(factory)
            .cacheDefaults(config)
            .withCacheConfiguration("products", config.entryTtl(Duration.ofHours(1)))
            .build();
    }
}

// Service with caching
@Service
public class ProductService {
    @Cacheable(value = "products", key = "#id")
    public Product findById(Long id) {
        log.info("Fetching from DB...");  // Only on cache miss
        return repository.findById(id).orElseThrow();
    }

    @CachePut(value = "products", key = "#product.id")
    public Product update(Product product) {
        return repository.save(product);  // Always executes, updates cache
    }

    @CacheEvict(value = "products", key = "#id")
    public void delete(Long id) {
        repository.deleteById(id);        // Removes from cache
    }

    @CacheEvict(value = "products", allEntries = true)
    public void clearCache() { }          // Clear all entries
}`,
            explanation: '@Cacheable avoids redundant DB calls. @CacheEvict keeps cache consistent on mutations. Redis provides distributed caching for scalability.'
          }
        ]
      }
    ]
  },

  {
    id: 'sb-testing',
    name: 'Testing (JUnit & Mockito)',
    icon: '🧪',
    concepts: [
      {
        id: 'sb-junit-mockito',
        title: 'JUnit 5 & Mockito',
        level: 'junior',
        shortDesc: 'JUnit 5: test framework (@Test, @BeforeEach, assertions). Mockito: mocking framework (mock, when/thenReturn, verify). @SpringBootTest: integration tests.',
        keyPoints: [
          'JUnit 5: @Test, @BeforeEach, @AfterEach, @DisplayName, @Nested',
          'Assertions: assertEquals, assertTrue, assertThrows, assertAll',
          'Mockito: @Mock, @InjectMocks, @Spy',
          'when(mock.method()).thenReturn(value) — stub behavior',
          'verify(mock).method() — verify interaction',
          '@SpringBootTest: loads full Spring context (integration test)',
          '@WebMvcTest: test controller layer only',
          '@DataJpaTest: test repository layer only (uses embedded DB)',
          '@MockBean: add mock to Spring context',
          'MockMvc: test REST endpoints without starting server',
          'Test naming: given_when_then pattern'
        ],
        detailed: `**JUnit 5** is the testing framework for Java. It provides annotations, assertions, and lifecycle hooks for writing tests.

**Mockito** is the mocking framework that creates mock objects for dependencies, letting you test a class in isolation.

**Spring Boot Test Slices:**
- @SpringBootTest: Full integration test (loads entire context)
- @WebMvcTest: Controller layer only (mock service layer)
- @DataJpaTest: Repository layer only (embedded database)
- @JsonTest: JSON serialization/deserialization

**Testing Pyramid:** Many unit tests → fewer integration tests → few E2E tests`,
        examples: [
          {
            title: 'Unit & Integration Tests',
            type: 'code',
            language: 'java',
            code: `// Unit Test with Mockito
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @Mock UserRepository repository;
    @Mock EmailService emailService;
    @InjectMocks UserService userService;

    @Test
    @DisplayName("Should return user when found")
    void findById_WhenExists_ReturnsUser() {
        User user = new User(1L, "Alice");
        when(repository.findById(1L)).thenReturn(Optional.of(user));

        User result = userService.findById(1L);

        assertEquals("Alice", result.getName());
        verify(repository).findById(1L);
    }

    @Test
    void findById_WhenNotFound_ThrowsException() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class,
            () -> userService.findById(99L));
    }
}

// Integration Test — Controller
@WebMvcTest(UserController.class)
class UserControllerTest {
    @Autowired MockMvc mockMvc;
    @MockBean UserService userService;

    @Test
    void getUser_ReturnsOk() throws Exception {
        when(userService.findById(1L)).thenReturn(new User(1L, "Alice"));

        mockMvc.perform(get("/api/users/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("Alice"));
    }
}

// Repository Test
@DataJpaTest
class UserRepositoryTest {
    @Autowired UserRepository repository;

    @Test
    void findByEmail_ReturnsUser() {
        repository.save(new User("Alice", "alice@test.com"));
        Optional<User> found = repository.findByEmail("alice@test.com");
        assertTrue(found.isPresent());
    }
}`,
            explanation: 'Use @Mock + @InjectMocks for unit tests. Use @WebMvcTest + @MockBean for controller tests. Use @DataJpaTest for repository tests.'
          }
        ]
      }
    ]
  },

  {
    id: 'sb-advanced',
    name: 'Advanced Topics',
    icon: '🔧',
    concepts: [
      {
        id: 'sb-validation',
        title: 'Request Validation',
        level: 'junior',
        shortDesc: '@Valid triggers bean validation. Annotations: @NotNull, @NotBlank, @Size, @Email, @Min, @Max, @Pattern. Custom validators with @Constraint.',
        keyPoints: [
          '@Valid: trigger validation on @RequestBody',
          '@NotNull: field must not be null',
          '@NotBlank: string must not be null/empty/whitespace',
          '@NotEmpty: string/collection must not be null/empty',
          '@Size(min, max): string/collection size constraints',
          '@Email: valid email format',
          '@Min, @Max: numeric range constraints',
          '@Pattern(regexp): regex pattern matching',
          'Custom validator: @Constraint + ConstraintValidator interface',
          'MethodArgumentNotValidException: thrown on validation failure',
          'Validation groups: validate different fields for different operations'
        ],
        detailed: `**Bean Validation (Jakarta Validation)** provides declarative constraints for request data. Spring integrates it with @Valid annotation.

**Validation Flow:**
1. Client sends JSON request
2. Spring deserializes to Java object
3. @Valid triggers validation
4. If invalid: throws MethodArgumentNotValidException
5. @RestControllerAdvice handles exception and returns error response`,
        examples: [
          {
            title: 'Request Validation',
            type: 'code',
            language: 'java',
            code: `// Request DTO with validation
record CreateUserRequest(
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be 2-50 characters")
    String name,

    @NotBlank @Email(message = "Invalid email format")
    String email,

    @Min(18) @Max(150)
    int age,

    @Pattern(regexp = "^\\\\+?[0-9]{10,15}$", message = "Invalid phone number")
    String phone,

    @NotNull @Size(min = 1)
    List<String> roles
) {}

// Controller
@PostMapping("/users")
ResponseEntity<User> create(@Valid @RequestBody CreateUserRequest request) {
    return ResponseEntity.created(uri).body(service.create(request));
}

// Custom Validator
@Constraint(validatedBy = UniqueEmailValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@interface UniqueEmail {
    String message() default "Email already registered";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {
    @Autowired UserRepository repo;
    public boolean isValid(String email, ConstraintValidatorContext ctx) {
        return !repo.existsByEmail(email);
    }
}`,
            explanation: 'Use @Valid + constraint annotations for declarative validation. Create custom validators for business rules like unique email checks.'
          }
        ]
      },
      {
        id: 'sb-feign-webclient',
        title: 'Feign Client & WebClient',
        level: 'mid',
        shortDesc: 'Feign: declarative REST client (interface + annotations). WebClient: reactive, non-blocking HTTP client (Spring WebFlux). RestTemplate: deprecated synchronous client.',
        keyPoints: [
          'Feign Client: declarative REST client using interfaces',
          '@FeignClient(name): define client by service name',
          'Feign integrates with Eureka for service discovery',
          'Feign supports Resilience4j for circuit breaking',
          'WebClient: reactive, non-blocking HTTP client (Spring 5+)',
          'WebClient replaces RestTemplate (deprecated for new code)',
          'WebClient: supports both sync (block()) and async (subscribe())',
          'WebClient.Builder: customizable with filters, codecs',
          'RestTemplate: legacy synchronous client (still widely used)',
          'Choose Feign for microservices, WebClient for reactive/modern apps'
        ],
        detailed: `**Feign Client** provides a declarative approach to REST API calls. You define an interface with annotations, and Spring generates the implementation. Integrates well with Spring Cloud (service discovery, load balancing, circuit breaker).

**WebClient** is the modern, reactive HTTP client from Spring WebFlux. It's non-blocking and supports both synchronous and asynchronous operations. Recommended replacement for RestTemplate.

**RestTemplate** is the legacy synchronous client. Still works but marked for deprecation in favor of WebClient.`,
        examples: [
          {
            title: 'Feign & WebClient',
            type: 'code',
            language: 'java',
            code: `// Feign Client — declarative
@FeignClient(name = "user-service", fallback = UserClientFallback.class)
public interface UserClient {
    @GetMapping("/api/users/{id}")
    User getUser(@PathVariable Long id);

    @PostMapping("/api/users")
    User createUser(@RequestBody CreateUserRequest request);
}

@Component
class UserClientFallback implements UserClient {
    public User getUser(Long id) { return new User(id, "Unknown"); }
    public User createUser(CreateUserRequest req) { throw new ServiceUnavailableException(); }
}

// WebClient — reactive/non-blocking
@Service
class ApiClient {
    private final WebClient webClient;

    ApiClient(WebClient.Builder builder) {
        this.webClient = builder.baseUrl("https://api.example.com").build();
    }

    // Async (reactive)
    Mono<User> getUserAsync(Long id) {
        return webClient.get()
            .uri("/users/{id}", id)
            .retrieve()
            .bodyToMono(User.class);
    }

    // Sync (blocking)
    User getUserSync(Long id) {
        return webClient.get()
            .uri("/users/{id}", id)
            .retrieve()
            .bodyToMono(User.class)
            .block(); // Blocks until response
    }

    // With error handling
    Mono<User> getUserSafe(Long id) {
        return webClient.get()
            .uri("/users/{id}", id)
            .retrieve()
            .onStatus(HttpStatusCode::is4xxClientError, resp -> Mono.error(new NotFoundException()))
            .bodyToMono(User.class)
            .retry(3);
    }
}`,
            explanation: 'Feign is declarative and great for microservice communication. WebClient is modern, reactive, and replaces RestTemplate for new projects.'
          }
        ]
      },
      {
        id: 'sb-rate-limiting',
        title: 'Rate Limiting & Load Balancing',
        level: 'senior',
        shortDesc: 'Rate limiting controls request frequency (Resilience4j RateLimiter, Redis-based, API Gateway). Load balancing distributes traffic (Spring Cloud LoadBalancer, round-robin, weighted).',
        keyPoints: [
          'Rate Limiting: control request rate to prevent abuse/overload',
          'Resilience4j RateLimiter: in-process rate limiting',
          'Redis-based: distributed rate limiting across instances',
          'API Gateway rate limiting: Spring Cloud Gateway + Redis',
          'Token Bucket / Sliding Window algorithms',
          'Load Balancing: distribute traffic across service instances',
          'Client-side: Spring Cloud LoadBalancer (replaces Ribbon)',
          'Server-side: Nginx, HAProxy, cloud load balancers',
          'Algorithms: Round Robin, Weighted, Least Connections, Random',
          '@LoadBalanced on WebClient/RestTemplate enables client-side LB'
        ],
        detailed: `**Rate Limiting** protects services from being overwhelmed by too many requests. Can be implemented at different levels: application, API Gateway, or infrastructure.

**Load Balancing** distributes incoming traffic across multiple instances of a service for scalability and high availability.

**Client-Side Load Balancing:** The client (calling service) chooses which instance to call. Spring Cloud LoadBalancer provides this.

**Server-Side Load Balancing:** A dedicated load balancer (Nginx, AWS ALB) distributes traffic.`,
        examples: [
          {
            title: 'Rate Limiting & Load Balancing',
            type: 'code',
            language: 'java',
            code: `// Rate Limiting with Resilience4j
@RateLimiter(name = "apiLimiter", fallbackMethod = "rateLimitFallback")
@GetMapping("/api/data")
public Data getData() { return service.getData(); }

Data rateLimitFallback(Exception ex) {
    throw new TooManyRequestsException("Rate limit exceeded. Try again later.");
}

// application.yml:
// resilience4j.ratelimiter.instances.apiLimiter:
//   limit-for-period: 10       # 10 requests per period
//   limit-refresh-period: 1s   # Reset every second
//   timeout-duration: 0s       # Don't wait, fail immediately

// API Gateway Rate Limiting (Spring Cloud Gateway + Redis)
// spring.cloud.gateway.routes:
// - id: api-route
//   uri: lb://API-SERVICE
//   predicates: Path=/api/**
//   filters:
//   - name: RequestRateLimiter
//     args:
//       redis-rate-limiter.replenishRate: 10
//       redis-rate-limiter.burstCapacity: 20

// Client-side Load Balancing
@Configuration
class WebClientConfig {
    @Bean
    @LoadBalanced  // Enables client-side load balancing
    WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }
}

// Usage: lb://SERVICE-NAME resolves via service discovery
webClient.get().uri("lb://USER-SERVICE/api/users").retrieve();`,
            explanation: 'Rate limiting prevents abuse. Load balancing distributes traffic. Use Resilience4j for app-level, API Gateway for global rate limiting.'
          }
        ]
      },
      {
        id: 'sb-json-serialization',
        title: 'JSON Serialization & Jackson',
        level: 'junior',
        shortDesc: 'Jackson handles JSON ↔ Java conversion. @JsonProperty, @JsonIgnore, @JsonFormat, @JsonSerialize. ObjectMapper for programmatic conversion.',
        keyPoints: [
          'Jackson: default JSON library in Spring Boot',
          'Auto-serialization: Java → JSON (response), JSON → Java (request)',
          '@JsonProperty("name"): customize JSON field name',
          '@JsonIgnore: exclude field from serialization',
          '@JsonFormat: format dates, numbers',
          '@JsonInclude(NON_NULL): skip null fields',
          '@JsonSerialize / @JsonDeserialize: custom serializers',
          'ObjectMapper: programmatic JSON conversion',
          '@JsonCreator + @JsonProperty: immutable object deserialization',
          'application.properties: spring.jackson.* for global configuration'
        ],
        detailed: `**Jackson** is the default JSON processing library in Spring Boot. It handles:
- Serialization: Java objects → JSON (for responses)
- Deserialization: JSON → Java objects (for request bodies)

Spring Boot auto-configures Jackson with sensible defaults. You can customize behavior with annotations or global configuration.`,
        examples: [
          {
            title: 'Jackson Annotations',
            type: 'code',
            language: 'java',
            code: `@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse {
    @JsonProperty("user_id")
    private Long id;

    private String name;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonIgnore
    private String password;     // Never sent in response

    @JsonProperty(access = Access.WRITE_ONLY)
    private String secret;       // Accept in request, hide in response

    @JsonProperty(access = Access.READ_ONLY)
    private String computed;     // Send in response, ignore in request
}

// Custom serializer
class MoneySerializer extends JsonSerializer<BigDecimal> {
    @Override
    public void serialize(BigDecimal value, JsonGenerator gen, SerializerProvider sp)
            throws IOException {
        gen.writeString("$" + value.setScale(2, RoundingMode.HALF_UP));
    }
}

// Global configuration
// spring.jackson.serialization.write-dates-as-timestamps=false
// spring.jackson.default-property-inclusion=non_null
// spring.jackson.property-naming-strategy=SNAKE_CASE`,
            explanation: 'Jackson annotations control JSON output. @JsonIgnore hides sensitive data. @JsonFormat controls date/number formatting.'
          }
        ]
      }
    ]
  }
];

export default springbootTopics;

