# InterviewPrep - Deployment Guide

This guide covers deploying InterviewPrep to production environments.

## 📋 Pre-Deployment Checklist

- [ ] Backend builds successfully
- [ ] Frontend builds successfully
- [ ] All tests pass
- [ ] API endpoints tested
- [ ] Database migrations tested
- [ ] Environment variables configured
- [ ] CORS settings updated
- [ ] Security headers added
- [ ] Performance optimized
- [ ] Error handling verified

## 🚀 Backend Deployment

### Option 1: Docker Deployment

1. **Create Dockerfile** in project root:

```dockerfile
FROM maven:3.8.1-openjdk-21 AS builder
WORKDIR /build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:21-slim
WORKDIR /app
COPY --from=builder /build/target/PreparationKit-1.0-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

2. **Build and run**:

```bash
docker build -t interviewprep-backend:latest .
docker run -p 8080:8080 interviewprep-backend:latest
```

### Option 2: Traditional JAR Deployment

1. **Build JAR**:

```bash
mvn clean package
```

2. **Deploy JAR**:

```bash
java -jar target/PreparationKit-1.0-SNAPSHOT.jar
```

### Option 3: Cloud Platforms

#### Heroku
```bash
heroku login
heroku create your-app-name
git push heroku main
```

#### AWS Elastic Beanstalk
```bash
eb create
eb deploy
```

#### Google Cloud Run
```bash
gcloud run deploy interviewprep --source .
```

### Production Configuration

Update `application.properties` for production:

```properties
# Server
server.port=8080
server.ssl.enabled=true
server.ssl.key-store=classpath:keystore.p12
server.ssl.key-store-password=${SSL_PASSWORD}

# Database
spring.datasource.url=jdbc:postgresql://prod-db:5432/interviewprep
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQL95Dialect
spring.jpa.hibernate.ddl-auto=validate

# Logging
logging.level.root=WARN
logging.level.org.springframework=INFO

# Security
management.endpoints.web.exposure.include=health
```

## 🌐 Frontend Deployment

### Option 1: Docker Deployment

1. **Create Dockerfile** in `frontend/`:

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /build/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. **Create nginx.conf**:

```nginx
server {
  listen 80;
  location / {
    root /usr/share/nginx/html;
    try_files $uri /index.html;
  }
  location /api {
    proxy_pass http://backend:8080;
  }
}
```

3. **Build and run**:

```bash
docker build -t interviewprep-frontend:latest .
docker run -p 80:80 interviewprep-frontend:latest
```

### Option 2: Static Hosting

1. **Build for production**:

```bash
cd frontend
npm run build
```

2. **Deploy to static hosts**:
   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3 + CloudFront
   - Firebase Hosting

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

#### Vercel
```bash
npm install -g vercel
vercel --prod
```

### Production Configuration

Create `frontend/.env.production`:

```
REACT_APP_API_BASE=https://api.yourdomain.com
REACT_APP_ENVIRONMENT=production
```

## 🐳 Docker Compose Full Stack

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: interviewprep
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - interviewprep

  backend:
    build: .
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/interviewprep
      SPRING_DATASOURCE_USERNAME: ${DB_USER}
      SPRING_DATASOURCE_PASSWORD: ${DB_PASSWORD}
    depends_on:
      - postgres
    networks:
      - interviewprep

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - interviewprep

volumes:
  postgres_data:

networks:
  interviewprep:
```

Run:
```bash
docker-compose up -d
```

## 🔐 Security Hardening

### 1. Update CORS Settings

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("https://yourdomain.com")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowedHeaders("*")
                    .allowCredentials(true)
                    .maxAge(3600);
            }
        };
    }
}
```

### 2. Add Security Headers

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.headers()
            .xssProtection()
            .and()
            .contentSecurityPolicy("default-src 'self'");
        return http.build();
    }
}
```

### 3. SSL/TLS Configuration

```properties
server.ssl.enabled=true
server.ssl.key-store=${SSL_KEYSTORE_PATH}
server.ssl.key-store-password=${SSL_KEYSTORE_PASSWORD}
server.ssl.key-store-type=PKCS12
```

## 📊 Monitoring & Logging

### Application Performance Monitoring (APM)

#### NewRelic
```xml
<dependency>
    <groupId>com.newrelic.agent.java</groupId>
    <artifactId>newrelic-java</artifactId>
    <version>latest</version>
</dependency>
```

#### DataDog
```properties
management.metrics.export.datadog.enabled=true
management.metrics.export.datadog.api-key=${DATADOG_API_KEY}
```

### Centralized Logging

#### ELK Stack (Elasticsearch, Logstash, Kibana)
```xml
<dependency>
    <groupId>net.logstash.logback</groupId>
    <artifactId>logstash-logback-encoder</artifactId>
    <version>7.2</version>
</dependency>
```

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up JDK 21
        uses: actions/setup-java@v3
        with:
          java-version: '21'
      - name: Build with Maven
        run: mvn clean package
      - name: Deploy to production
        run: |
          # Add deployment script

  build-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install and build
        run: |
          cd frontend
          npm ci
          npm run build
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2
        with:
          publish-dir: ./frontend/build
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Production deployment"
```

## 📈 Performance Optimization

### Backend
1. Enable HTTP/2
2. Enable caching headers
3. Use CDN for static assets
4. Database connection pooling
5. Query optimization

### Frontend
1. Code splitting
2. Lazy loading
3. Image optimization
4. Minification
5. Gzip compression

## 🔍 Health Checks

### Backend Health Endpoint

```java
@RestController
@RequestMapping("/health")
public class HealthController {
    @GetMapping
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "version", "1.0.0"
        ));
    }
}
```

### Frontend Health Check

```javascript
const checkHealth = async () => {
  try {
    const response = await fetch('/health');
    return response.ok;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
};
```

## 📊 Database Migration

### PostgreSQL Setup

```sql
-- Create user
CREATE USER interviewprep WITH PASSWORD 'password';

-- Create database
CREATE DATABASE interviewprep OWNER interviewprep;

-- Connect and run migrations
\c interviewprep
```

### Flyway Migration

```xml
<dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-core</artifactId>
    <version>9.14.0</version>
</dependency>
```

Create `src/main/resources/db/migration/V1__Initial_schema.sql`

## 🚨 Troubleshooting Deployment

### Port Already in Use
```bash
# Find and kill process
lsof -i :8080
kill -9 <PID>
```

### Database Connection Issues
- Verify credentials
- Check network connectivity
- Test with DB client

### CORS Errors
- Check allowed origins
- Verify API base URL
- Check browser console

### Performance Issues
- Monitor CPU/Memory
- Check database queries
- Enable caching
- Use CDN

## 📞 Support

For deployment issues:
1. Check application logs
2. Monitor error rates
3. Test endpoints manually
4. Review recent changes
5. Contact support

---

**Happy deploying! 🚀**

