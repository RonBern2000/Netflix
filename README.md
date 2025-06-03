# Netflix Clone
An online streaming platform that offers browsing and watching up-to-date
movies, payment processing and personal recommendations.
# Overview
**Core Features**
  • **User Authentication**: Secure user registration and login.
  • **Payment**: Payment through Paypal api.
  • **AI Recommendations**: Ai driven movies recommendations.
  • **Caching**: Enhanced performance through Redis caching.
  • **Event Streaming**: Real-time updates and communication between microservices with RabbitMQ.
  • **State Management**: Efficient state management using Redux.

**Technologies Used**
  • Frontend: React, React Query, TailwindCSS
  • Backend: Node.js, Express
  • Database: MongoDB, MySQL
  • Authentication: JSON Web Tokens (JWT), bcrypt
  • State Management: Redux
  • Caching: Redis
  • Event Streaming: RabbitMQ.
  • Payment Processing: Payapl
  • Testing: Jest, Supertest
  • Containerization: Docker
  • Orchestration: Kubernetes
  • Continuous Development: Skaffold
  • CI/CD: GitHub Actions
  • Deployment: DigitalOcean

**Microservices Architecture**
The application is divided into several microservices, each responsible for a specific domain of the application:

User Service
Handles user registration, login, and authentication using JWTs. It ensures secure access to other services.

Movies Service
Manages the movies in the site, keeping the most up to date movies via TMDB api.

Payments Service
Integrates with payment gateways to handle transactions securely. Ensures payments are processed before completing a payment.

RabbitMQ Service
Implements event streaming to ensure real-time communication between services, facilitating a responsive and cohesive system.

AI Recommendation Service
Uses AI to analyze user behavior and recommend the best tickets for each user based on their past activity.
