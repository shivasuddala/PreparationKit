// ============================================================
// CI/CD - Complete Interview Preparation Data
// ============================================================

const cicdTopics = [
  {
    id: 'cicd-git',
    name: 'Git & Version Control',
    icon: '📝',
    concepts: [
      {
        id: 'cicd-git-basics',
        title: 'Git Fundamentals',
        level: 'fresher',
        shortDesc: 'Git is a distributed version control system. Key concepts: repository, commit, branch, merge, rebase. Working tree → Staging area → Local repo → Remote repo.',
        keyPoints: [
          'Git: distributed VCS — every developer has full repository history',
          'Working Directory → Staging (git add) → Local Repo (git commit) → Remote (git push)',
          'Commit: snapshot of changes with a unique SHA hash',
          'Branch: lightweight pointer to a commit (cheap to create)',
          'HEAD: pointer to the current branch/commit',
          'git clone: copy remote repository locally',
          'git pull = git fetch + git merge',
          'git stash: temporarily save uncommitted changes',
          '.gitignore: specify files/patterns to exclude from tracking',
          'Merge: combine branches (creates merge commit)',
          'Rebase: replay commits on top of another branch (linear history)'
        ],
        detailed: `**Git** is a distributed version control system where every developer has a complete copy of the repository, including full history.

**Core Workflow:**
1. \`git clone\` — Copy remote repo
2. \`git branch feature\` — Create feature branch
3. Make changes → \`git add .\` → \`git commit -m "msg"\`
4. \`git push origin feature\` — Push to remote
5. Create Pull Request → Code Review → Merge

**Branching Strategies:**
- **Git Flow:** main, develop, feature/*, release/*, hotfix/*
- **GitHub Flow:** main + feature branches (simpler)
- **Trunk-Based:** Small, frequent commits to main`,
        examples: [
          {
            title: 'Essential Git Commands',
            type: 'code',
            language: 'bash',
            code: `# Setup
git init                          # Initialize new repo
git clone <url>                   # Clone remote repo

# Daily workflow
git status                        # Check current state
git add .                         # Stage all changes
git commit -m "feat: add login"   # Commit with message
git push origin feature/login     # Push to remote

# Branching
git branch feature/payment        # Create branch
git checkout -b feature/payment   # Create + switch
git switch -c feature/payment     # Modern syntax (Git 2.23+)
git merge feature/payment         # Merge into current branch
git rebase main                   # Rebase onto main

# Undoing
git reset --soft HEAD~1           # Undo last commit, keep changes staged
git reset --hard HEAD~1           # Undo last commit, discard changes
git revert <hash>                 # Create new commit that undoes changes
git stash                         # Save uncommitted changes
git stash pop                     # Restore stashed changes

# History
git log --oneline --graph         # Visual commit history
git diff branch1..branch2         # Compare branches
git blame <file>                  # Who changed each line`,
            explanation: 'These commands cover the daily Git workflow. Use branches for features, commits for snapshots, and PRs for code review.'
          },
          {
            title: 'Git Branching Strategies',
            type: 'comparison',
            language: 'text',
            code: `Git Flow:
  main ──────────────────────────────── (production)
    ↑                        ↑
  release/1.0 ──────────── merge
    ↑
  develop ──────────────────────────── (integration)
    ↑              ↑
  feature/login  feature/payment

GitHub Flow (simpler):
  main ──────────────────────────────── (production)
    ↑              ↑
  feature/login  feature/payment
  (PR + Review)  (PR + Review)

Trunk-Based (fastest):
  main ──────────────────────────────── (production)
    ↑  ↑  ↑  ↑  ↑  ↑
  Small, frequent commits with feature flags`,
            explanation: 'Git Flow is structured but complex. GitHub Flow is simpler for web apps. Trunk-Based is fastest for CI/CD-heavy teams.'
          }
        ]
      },
      {
        id: 'cicd-github-bitbucket',
        title: 'GitHub & Bitbucket',
        level: 'fresher',
        shortDesc: 'GitHub: largest Git hosting platform with Actions for CI/CD, Issues, PRs. Bitbucket: Atlassian\'s Git platform with Pipelines, Jira integration.',
        keyPoints: [
          'GitHub: most popular Git hosting (Microsoft-owned)',
          'GitHub Actions: built-in CI/CD workflows (YAML-based)',
          'GitHub Pages: free static site hosting',
          'Pull Requests: code review + merge workflow',
          'GitHub Issues & Projects: project management',
          'Bitbucket: Atlassian\'s Git platform (Jira integration)',
          'Bitbucket Pipelines: built-in CI/CD',
          'Both support branch protection rules',
          'GitHub Actions > Bitbucket Pipelines (larger ecosystem)',
          'Webhooks: trigger actions on events (push, PR, etc.)'
        ],
        detailed: `**GitHub** is the world's largest code hosting platform. Key features: repositories, pull requests, code review, Actions (CI/CD), Pages (static hosting), Packages (package registry).

**Bitbucket** is Atlassian's Git platform, tightly integrated with Jira and Confluence. Key features: Pipelines (CI/CD), code review, branch permissions.

**GitHub Actions** uses YAML workflow files in \`.github/workflows/\` to define CI/CD pipelines triggered by events (push, PR, schedule).`,
        examples: [
          {
            title: 'GitHub Actions CI/CD Workflow',
            type: 'code',
            language: 'yaml',
            code: `# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Java 17
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'

      - name: Build with Maven
        run: mvn clean package -DskipTests

      - name: Run Tests
        run: mvn test

      - name: Build Docker Image
        run: docker build -t myapp:$GITHUB_SHA .

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to Production
        run: |
          echo "Deploying to production..."`,
            explanation: 'GitHub Actions automates build, test, and deploy on every push. Jobs run in parallel by default; use "needs" for dependencies.'
          }
        ]
      }
    ]
  },

  {
    id: 'cicd-jenkins',
    name: 'Jenkins & CI/CD Pipeline',
    icon: '🔧',
    concepts: [
      {
        id: 'cicd-jenkins',
        title: 'Jenkins Pipeline',
        level: 'junior',
        shortDesc: 'Jenkins: open-source automation server. Declarative Pipeline (Jenkinsfile) defines stages: Build, Test, Package, Deploy. Supports plugins for any tool integration.',
        keyPoints: [
          'Jenkins: open-source CI/CD automation server',
          'Jenkinsfile: pipeline-as-code (checked into version control)',
          'Declarative Pipeline: structured syntax with stages',
          'Scripted Pipeline: Groovy-based, more flexible',
          'Stages: logical groups (Build, Test, Deploy)',
          'Steps: individual tasks within a stage',
          'Agent: where pipeline runs (any, docker, label)',
          'Triggers: SCM polling, webhooks, cron',
          'Blue Ocean: modern Jenkins UI for pipelines',
          'Shared Libraries: reusable pipeline code',
          'Credentials: secure storage for secrets',
          'Plugins: 1800+ plugins for tool integration'
        ],
        detailed: `**Jenkins** is the most widely used open-source CI/CD server. It automates building, testing, and deploying applications.

**Pipeline Types:**
1. **Declarative Pipeline:** Structured, opinionated syntax. Easier to read and write.
2. **Scripted Pipeline:** Groovy-based, more flexible but harder to maintain.

**Key Concepts:**
- **Agent:** Execution environment (any, docker container, specific node)
- **Stage:** Logical phase (Build, Test, Deploy)
- **Step:** Individual command/task
- **Post:** Actions after pipeline (success, failure, always)`,
        examples: [
          {
            title: 'Declarative Jenkinsfile',
            type: 'code',
            language: 'groovy',
            code: `pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'registry.example.com'
        APP_NAME = 'my-app'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/org/repo.git'
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean package -DskipTests'
            }
        }

        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    steps { sh 'mvn test' }
                }
                stage('Integration Tests') {
                    steps { sh 'mvn verify -P integration' }
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t \${DOCKER_REGISTRY}/\${APP_NAME}:\${BUILD_NUMBER} ."
            }
        }

        stage('Deploy to Staging') {
            when { branch 'develop' }
            steps {
                sh "kubectl apply -f k8s/staging/"
            }
        }

        stage('Deploy to Production') {
            when { branch 'main' }
            input { message 'Deploy to production?' }
            steps {
                sh "kubectl apply -f k8s/production/"
            }
        }
    }

    post {
        success { slackSend message: "Build Successful!" }
        failure { slackSend message: "Build Failed!" }
        always  { cleanWs() }
    }
}`,
            explanation: 'Jenkinsfile defines the entire pipeline. Stages run sequentially, parallel for concurrent tasks. Post actions handle notifications and cleanup.'
          }
        ]
      },
      {
        id: 'cicd-pipeline-concepts',
        title: 'CI/CD Pipeline Concepts',
        level: 'junior',
        shortDesc: 'CI: continuous integration (build + test on every commit). CD: continuous delivery (auto deploy to staging) / deployment (auto deploy to production).',
        keyPoints: [
          'CI (Continuous Integration): merge code frequently, auto build + test',
          'CD (Continuous Delivery): auto deploy to staging, manual approval for prod',
          'CD (Continuous Deployment): auto deploy to production (no manual step)',
          'Pipeline stages: Build → Test → Package → Deploy',
          'Artifact: build output (JAR, WAR, Docker image)',
          'Build triggers: push, PR, schedule (cron), manual',
          'Quality gates: code coverage, static analysis, security scan',
          'Blue-green deployment: two identical environments, switch traffic',
          'Canary deployment: gradual rollout to subset of users',
          'Rolling deployment: update instances one by one',
          'Feature flags: toggle features without deployment'
        ],
        detailed: `**CI/CD** is a set of practices that automate the software delivery process.

**Continuous Integration (CI):**
Every code change triggers an automated build and test. Catches bugs early and ensures code quality.

**Continuous Delivery (CD):**
Extends CI by automatically deploying to staging environments. Production deployment requires manual approval.

**Continuous Deployment:**
Every change that passes tests is automatically deployed to production. Requires high test confidence.

**Deployment Strategies:**
1. **Blue-Green:** Two environments, instant switch
2. **Canary:** Gradual rollout (1% → 10% → 50% → 100%)
3. **Rolling:** Update instances incrementally
4. **A/B Testing:** Different versions for different users`,
        examples: [
          {
            title: 'CI/CD Pipeline Flow',
            type: 'comparison',
            language: 'text',
            code: `CI/CD Pipeline Flow:

Code Push → Build → Unit Tests → Integration Tests → Security Scan
    → Package (JAR/Docker) → Deploy Staging → Smoke Tests
    → Manual Approval → Deploy Production → Health Check

Deployment Strategies:

Blue-Green:
  [Blue v1] ← Traffic     →  [Blue v1]
  [Green v2] (standby)        [Green v2] ← Traffic (switched)

Canary:
  [v1] ← 95% traffic     →  [v1] ← 0%
  [v2] ← 5% traffic          [v2] ← 100% (gradual increase)

Rolling:
  [v1] [v1] [v1] [v1]    →  [v2] [v2] [v2] [v2]
  (update one at a time)`,
            explanation: 'CI ensures code quality through automated testing. CD automates deployment. Choose deployment strategy based on risk tolerance and rollback needs.'
          }
        ]
      }
    ]
  },

  {
    id: 'cicd-docker',
    name: 'Docker',
    icon: '🐳',
    concepts: [
      {
        id: 'cicd-docker-basics',
        title: 'Docker Fundamentals',
        level: 'junior',
        shortDesc: 'Docker packages apps in containers (lightweight, portable). Image = blueprint, Container = running instance. Dockerfile defines build steps. Docker Compose for multi-container apps.',
        keyPoints: [
          'Docker: platform for building, shipping, and running containers',
          'Image: read-only template (blueprint) built from Dockerfile',
          'Container: running instance of an image (lightweight, isolated)',
          'Dockerfile: instructions to build an image (FROM, COPY, RUN, CMD)',
          'Docker Hub: public registry for Docker images',
          'docker build: create image from Dockerfile',
          'docker run: create and start container from image',
          'docker-compose: define and run multi-container apps',
          'Volumes: persist data outside containers',
          'Networks: container-to-container communication',
          'Multi-stage builds: smaller final images (build + runtime stages)',
          'Layer caching: Docker caches unchanged layers for faster builds'
        ],
        detailed: `**Docker** provides OS-level virtualization through containers. Containers are lightweight (share host OS kernel), portable, and consistent across environments.

**Docker vs VM:**
- VM: full OS, heavy (GBs), slow startup
- Container: shares host kernel, lightweight (MBs), instant startup

**Dockerfile Instructions:**
- FROM: base image
- WORKDIR: set working directory
- COPY/ADD: copy files into image
- RUN: execute command during build
- CMD/ENTRYPOINT: command to run when container starts
- EXPOSE: document the port
- ENV: set environment variables`,
        examples: [
          {
            title: 'Dockerfile for Spring Boot',
            type: 'code',
            language: 'dockerfile',
            code: `# Multi-stage build for Spring Boot
# Stage 1: Build
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline          # Cache dependencies
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime (smaller image)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
HEALTHCHECK CMD curl -f http://localhost:8080/actuator/health || exit 1
ENTRYPOINT ["java", "-jar", "app.jar"]`,
            explanation: 'Multi-stage builds separate build and runtime. The final image only contains the JRE and JAR, making it much smaller.'
          },
          {
            title: 'Docker Commands & Compose',
            type: 'code',
            language: 'yaml',
            code: `# Docker commands:
# docker build -t myapp:1.0 .
# docker run -d -p 8080:8080 --name myapp myapp:1.0
# docker logs myapp
# docker exec -it myapp /bin/sh
# docker stop myapp && docker rm myapp

# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=docker
      - SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/mydb
    depends_on:
      db:
        condition: service_healthy
    networks:
      - app-network

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: mydb
    volumes:
      - db-data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - app-network

volumes:
  db-data:

networks:
  app-network:`,
            explanation: 'Docker Compose orchestrates multi-container apps. Services can communicate via networks, persist data with volumes, and define health checks.'
          }
        ]
      }
    ]
  },

  {
    id: 'cicd-kubernetes',
    name: 'Kubernetes',
    icon: '☸️',
    concepts: [
      {
        id: 'cicd-k8s',
        title: 'Kubernetes Fundamentals',
        level: 'mid',
        shortDesc: 'K8s orchestrates containers at scale. Key objects: Pod (smallest unit), Deployment (manages replicas), Service (networking), Ingress (external access).',
        keyPoints: [
          'Kubernetes (K8s): container orchestration platform',
          'Pod: smallest deployable unit (1+ containers sharing network)',
          'Deployment: manages ReplicaSets, handles rolling updates',
          'Service: stable network endpoint for pods (ClusterIP, NodePort, LoadBalancer)',
          'Ingress: HTTP routing, TLS termination, load balancing',
          'ConfigMap: externalized configuration (key-value pairs)',
          'Secret: sensitive data (base64 encoded)',
          'Namespace: virtual cluster for isolation',
          'HPA (Horizontal Pod Autoscaler): auto-scale based on CPU/memory',
          'kubectl: CLI for managing K8s clusters',
          'Helm: package manager for K8s (charts)',
          'Liveness/Readiness probes: health checking'
        ],
        detailed: `**Kubernetes** automates deployment, scaling, and management of containerized applications.

**Architecture:**
- **Control Plane:** API Server, Scheduler, Controller Manager, etcd
- **Worker Nodes:** kubelet, kube-proxy, container runtime

**Key Objects:**
1. **Pod:** One or more containers with shared storage/network
2. **Deployment:** Desired state for pods (replicas, image, strategy)
3. **Service:** Stable IP/DNS for accessing pods
4. **Ingress:** External HTTP access with routing rules
5. **ConfigMap/Secret:** Configuration and sensitive data`,
        examples: [
          {
            title: 'K8s Deployment & Service',
            type: 'code',
            language: 'yaml',
            code: `# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: myapp
          image: registry.example.com/myapp:1.0
          ports:
            - containerPort: 8080
          resources:
            requests: { cpu: "250m", memory: "256Mi" }
            limits:   { cpu: "500m", memory: "512Mi" }
          livenessProbe:
            httpGet: { path: /actuator/health, port: 8080 }
            initialDelaySeconds: 30
          readinessProbe:
            httpGet: { path: /actuator/health/readiness, port: 8080 }
          envFrom:
            - configMapRef:
                name: myapp-config
---
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  type: ClusterIP
  selector:
    app: myapp
  ports:
    - port: 80
      targetPort: 8080
---
# HPA (auto-scaling)
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target: { type: Utilization, averageUtilization: 70 }`,
            explanation: 'Deployment manages pods with rolling updates. Service provides stable networking. HPA auto-scales based on CPU utilization.'
          },
          {
            title: 'Essential kubectl Commands',
            type: 'code',
            language: 'bash',
            code: `# Cluster info
kubectl cluster-info
kubectl get nodes

# Deployments
kubectl apply -f deployment.yaml         # Create/update
kubectl get deployments                   # List
kubectl describe deployment myapp         # Details
kubectl rollout status deployment/myapp   # Watch rollout
kubectl rollout undo deployment/myapp     # Rollback!
kubectl scale deployment myapp --replicas=5  # Scale

# Pods
kubectl get pods                          # List pods
kubectl logs myapp-pod-xyz                # View logs
kubectl exec -it myapp-pod-xyz -- /bin/sh # Shell into pod
kubectl port-forward pod/myapp 8080:8080  # Local access

# Services
kubectl get services
kubectl expose deployment myapp --port=80 --target-port=8080

# Config
kubectl create configmap myapp-config --from-file=config/
kubectl create secret generic db-secret --from-literal=password=mysecret

# Debugging
kubectl describe pod myapp-pod-xyz        # Events & status
kubectl top pods                          # Resource usage`,
            explanation: 'kubectl is the primary CLI for Kubernetes. Use apply for declarative management, rollout for deployments, and logs/exec for debugging.'
          }
        ]
      },
      {
        id: 'cicd-scaling-rollback',
        title: 'Scaling & Rollback Strategies',
        level: 'mid',
        shortDesc: 'Horizontal scaling: add more pods. Vertical scaling: increase pod resources. Rolling update: gradual replacement. Rollback: kubectl rollout undo.',
        keyPoints: [
          'Horizontal Scaling: increase number of pod replicas (HPA)',
          'Vertical Scaling: increase CPU/memory per pod (VPA)',
          'HPA: auto-scale based on CPU, memory, or custom metrics',
          'Rolling Update: replace pods one by one (zero downtime)',
          'Recreate: kill all old pods, then create new (downtime)',
          'Rollback: kubectl rollout undo deployment/myapp',
          'Revision history: K8s stores deployment history for rollback',
          'maxSurge: extra pods during update (for capacity)',
          'maxUnavailable: pods that can be down during update',
          'Canary with K8s: run v1 and v2 deployments, shift traffic gradually',
          'Blue-Green with K8s: two deployments, switch Service selector'
        ],
        detailed: `**Scaling Strategies:**
1. **Horizontal Pod Autoscaler (HPA):** Auto-adjusts replica count based on metrics
2. **Vertical Pod Autoscaler (VPA):** Auto-adjusts resource requests/limits
3. **Cluster Autoscaler:** Adds/removes nodes based on pod demand

**Deployment Strategies:**
1. **Rolling Update (default):** Gradually replace old pods with new
2. **Recreate:** Delete all old pods, create new (causes downtime)
3. **Blue-Green:** Two deployments, switch traffic via Service
4. **Canary:** Partial traffic to new version

**Rollback:** Kubernetes stores deployment revision history. \`kubectl rollout undo\` reverts to previous version instantly.`,
        examples: [
          {
            title: 'Scaling & Rollback Commands',
            type: 'code',
            language: 'bash',
            code: `# Manual scaling
kubectl scale deployment myapp --replicas=5

# Auto-scaling (HPA)
kubectl autoscale deployment myapp --min=2 --max=10 --cpu-percent=70

# Check HPA status
kubectl get hpa

# Deployment update (triggers rolling update)
kubectl set image deployment/myapp myapp=registry.example.com/myapp:2.0

# Watch rollout progress
kubectl rollout status deployment/myapp

# Rollback to previous version
kubectl rollout undo deployment/myapp

# Rollback to specific revision
kubectl rollout history deployment/myapp
kubectl rollout undo deployment/myapp --to-revision=3

# Blue-Green deployment
# Deploy v2 alongside v1:
kubectl apply -f deployment-v2.yaml
# Switch Service to v2:
kubectl patch service myapp -p '{"spec":{"selector":{"version":"v2"}}}'
# Rollback — switch back to v1:
kubectl patch service myapp -p '{"spec":{"selector":{"version":"v1"}}}'`,
            explanation: 'HPA handles automatic scaling. Rolling updates provide zero-downtime deploys. Rollback is instant with revision history.'
          }
        ]
      }
    ]
  },

  {
    id: 'cicd-packaging',
    name: 'Packaging & Build Tools',
    icon: '📦',
    concepts: [
      {
        id: 'cicd-packaging',
        title: 'JAR, WAR & Maven/Gradle',
        level: 'fresher',
        shortDesc: 'JAR: Java Archive (standalone app). WAR: Web Application Archive (for servlet containers). Maven (pom.xml) and Gradle (build.gradle) manage builds and dependencies.',
        keyPoints: [
          'JAR (Java Archive): contains compiled classes, resources, manifest',
          'Fat/Uber JAR: includes all dependencies (Spring Boot default)',
          'WAR (Web Application Archive): for deployment to Tomcat, WildFly',
          'Spring Boot creates executable JARs with embedded server',
          'Maven: build tool using pom.xml (Convention over Configuration)',
          'Maven lifecycle: compile → test → package → install → deploy',
          'Maven profiles: environment-specific build configuration',
          'Gradle: build tool using build.gradle (Groovy/Kotlin DSL)',
          'Gradle is faster (incremental builds, build cache)',
          'Dependency scope: compile, runtime, test, provided',
          'mvn clean package: build JAR/WAR',
          'mvn spring-boot:run: run Spring Boot app'
        ],
        detailed: `**Packaging Types:**
- **JAR:** Standalone Java application. Spring Boot creates "fat JARs" that include an embedded web server (Tomcat/Jetty).
- **WAR:** Deployed to an external servlet container. Rarely used with Spring Boot.

**Maven vs Gradle:**
| Feature     | Maven              | Gradle              |
|-------------|-------------------|----------------------|
| Config      | XML (pom.xml)     | Groovy/Kotlin DSL    |
| Speed       | Slower            | Faster (incremental) |
| Flexibility | Convention-based   | Highly flexible      |
| Adoption    | Most common (Java) | Growing (Android)    |`,
        examples: [
          {
            title: 'Maven POM & Build',
            type: 'code',
            language: 'xml',
            code: `<!-- pom.xml -->
<project>
    <groupId>com.example</groupId>
    <artifactId>myapp</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
    </parent>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>

<!-- Build commands:
mvn clean package              # Build JAR
mvn clean package -DskipTests  # Skip tests
mvn spring-boot:run            # Run application
mvn dependency:tree             # Show dependency tree
-->`,
            explanation: 'Spring Boot parent POM manages versions. spring-boot-maven-plugin creates executable fat JARs with embedded Tomcat.'
          }
        ]
      }
    ]
  }
];

export default cicdTopics;

