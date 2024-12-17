# Microservices Architecture with Multi-Tenancy

This repository showcases a microservices-based application built using **Java**, **Spring Boot**, and **Spring Cloud**. The project focuses on multi-tenant architecture, containerization, and deployment on **AWS** using modern tools and frameworks like **Docker**, **Kubernetes**, and **React**.

This project was developed as part of my work at **RAD Technologies**.

---

## 🚀 **Features**

- **Microservices Architecture**: Developed modular services using **Java**, **Spring Boot**, and **Spring Cloud** for scalability and maintainability.
- **Multi-Tenant Support**: Enhanced the application to support a multi-tenant architecture ensuring tenant isolation and scalability.
- **Containerization**: Used **Docker** for containerizing microservices for ease of deployment and development.
- **Kubernetes Orchestration**: Managed microservices deployment and scaling using **Kubernetes** and **Amazon EKS**.
- **Front-End with React and Vite**: Built an interactive and modern UI using **React**, **TypeScript**, and **Vite**.
- **AWS Deployment**:
  - **EC2** for compute power.
  - **Amazon EKS** for container orchestration.
  - **Kubernetes** for automating deployment and management.

---

## 🛠️ **Tech Stack**

### Backend
- **Java 17**
- **Spring Boot**
- **Spring Cloud** (Microservices utilities)
- **Multi-Tenancy Support**
- **Docker**
- **Kubernetes**

### Frontend
- **React**
- **TypeScript**
- **Vite**

### Deployment
- **AWS EC2**
- **Amazon EKS** (Elastic Kubernetes Service)
- **Docker**
- **Kubernetes**

---

## 📦 **Microservices**

The project follows a modular microservices design:
1. **ms-store**: Handles store management functionality.
2. **ms-account**: Manages user account-related features.
3. **ms-covid**: Provides COVID-19 related data and services.
4. **ms-news**: Handles news and notifications.
5. **ms-service_discovery**: Service discovery using Spring Cloud Netflix Eureka.
6. **ms-api_gateway**: API Gateway for routing requests and handling communication.

Each service is deployed independently and communicates via **REST APIs**.

---

## ⚙️ **Setup Instructions**

### Prerequisites
- Install **Docker** and **Docker Compose**.
- Install **Kubernetes CLI** (kubectl).
- Install **Node.js** (for React).
- Install **AWS CLI** and configure it for deployment.

### Steps to Run
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ShavitMor/rad.git
   ```

2. **Build Backend Microservices**:
   ```bash
   mvn clean package
   docker-compose up -d
   ```

3. **Start Front-End**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Deploy to Kubernetes**:
   - Push Docker images to a container registry (e.g., Amazon ECR).
   - Apply Kubernetes manifests:
     ```bash
     kubectl apply -f k8s/deployment/
     ```

5. **Access Application**:
   - API Gateway: `http://localhost:8080`

---

## 📈 **Deployment on AWS**

1. **Build and Push Docker Images**:
   - Use Amazon ECR to store container images.
   - Example:
     ```bash
     docker build -t my-service:latest .
     aws ecr push <image-path>
     ```

2. **Deploy to Amazon EKS**:
   - Set up an EKS cluster using the AWS CLI or Terraform.

---

## 📝 **Future Improvements**
- Add CI/CD pipelines with **GitHub Actions**.
- Enhance monitoring with **Prometheus** and **Grafana**.

---

## 🤝 **Contributing**
Feel free to open pull requests or issues for improvements or bug fixes.

---

## 📜 **License**
This project is licensed under the MIT License. See `LICENSE` for details.

---

## 🌟 **Author**
Shavit Mor https://github.com/ShavitMor
**LinkedIn**: https://www.linkedin.com/in/shavitmor7/

