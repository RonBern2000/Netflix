# Netflix Clone  
An online streaming platform that offers browsing and watching up-to-date movies, payment processing, and personal recommendations.

## Overview

### **Core Features**
- **User Authentication**
  - Secure user registration  
  - Login functionality  
  - JWT-based session management  

- **Payment**
  - Integration with PayPal API  
  - Secure payment processing  
  - Confirmation and error handling  

- **AI Recommendations**
  - Behavior analysis using AI models  
  - Personalized movie suggestions  
  - Continuous learning from user interactions  

- **Caching**
  - Data caching using Redis  
  - Reduces response time  
  - Handles high traffic efficiently  

- **Event Streaming**
  - Real-time updates  
  - Communication between microservices  
  - Powered by RabbitMQ  

- **State Management**
  - Centralized state using Redux  
  - Efficient data sharing across components  
  - Predictable state transitions  

---

### **Technologies Used**

- **Frontend**
  - React  
  - React Query  
  - TailwindCSS  

- **Backend**
  - Node.js  
  - Express  

- **Database**
  - MongoDB  
  - MySQL  

- **Authentication**
  - JSON Web Tokens (JWT)  
  - bcrypt for password hashing  

- **State Management**
  - Redux  

- **Caching**
  - Redis  

- **Event Streaming**
  - RabbitMQ  

- **Payment Processing**
  - PayPal  

- **Testing**
  - Jest  
  - Supertest  

- **Containerization**
  - Docker  

- **Orchestration**
  - Kubernetes  

- **Continuous Development**
  - Skaffold  

- **CI/CD**
  - GitHub Actions  

- **Deployment**
  - DigitalOcean  

---

### **Microservices Architecture**  
The application follows a microservices architecture, where each service handles a specific domain:

- **User Service**
  - Handles:
    - User registration  
    - Login and authentication  
  - Security:
    - Uses JWT for secure token-based access  

- **Movies Service**
  - Responsibilities:
    - Manages movie data  
    - Syncs with TMDB API  
    - Ensures movies are always up to date  

- **Payments Service**
  - Functions:
    - Integrates PayPal for secure payments  
    - Verifies payment before granting access  
    - Tracks transaction history  

- **RabbitMQ Service**
  - Role:
    - Facilitates inter-service communication  
    - Publishes and consumes events in real time  
    - Ensures service decoupling and reliability  

- **AI Recommendation Service**
  - Purpose:
    - Analyzes viewing behavior  
    - Learns from user interactions  
    - Suggests personalized movie content  
