# AWS Serverless URL Shortener with Usage Analytics

<p align="center">
  <img src="https://img.shields.io/badge/AWS-Serverless-orange?logo=amazonaws" alt="AWS Serverless">
  <img src="https://img.shields.io/badge/Python-3.x-blue?logo=python" alt="Python">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?logo=react" alt="React">
  <img src="https://img.shields.io/badge/AWS-Lambda-FF9900?logo=awslambda" alt="AWS Lambda">
  <img src="https://img.shields.io/badge/API-Gateway-6A1B9A?logo=amazonapigateway" alt="API Gateway">
  <img src="https://img.shields.io/badge/Amazon-DynamoDB-4053D6?logo=amazondynamodb" alt="DynamoDB">
  <img src="https://img.shields.io/badge/Amazon-S3-569A31?logo=amazons3" alt="S3">
  <img src="https://img.shields.io/badge/Amazon-CloudFront-8C4FFF?logo=amazoncloudfront" alt="CloudFront">
  <img src="https://img.shields.io/badge/Amazon-Cognito-5A29E4?logo=amazoncognito" alt="Cognito">
  <img src="https://img.shields.io/badge/Amazon-SQS-FF4F8B?logo=amazonsqs" alt="SQS">
  <img src="https://img.shields.io/badge/Amazon-Athena-9B59B6?logo=amazonaws" alt="Athena">
  <img src="https://img.shields.io/badge/Amazon-CloudWatch-FF4F8B?logo=amazoncloudwatch" alt="CloudWatch">
  <img src="https://img.shields.io/badge/AWS-X--Ray-8C4FFF?logo=amazonaws" alt="X-Ray">
</p>

<p align="center">
  <b>A cloud-native, fully serverless URL shortening platform built on Amazon Web Services</b>
</p>

<p align="center">
  <a href="#project-overview">Overview</a> •
  <a href="#key-features">Features</a> •
  <a href="#system-architecture">Architecture</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#screenshots">Screenshots</a> •
  <a href="#technology-stack">Tech Stack</a>
</p>

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Architecture Workflow](#architecture-workflow)
- [AWS Services Used](#aws-services-used)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Cost Management Notice](#cost-management-notice)
- [Future Enhancements](#future-enhancements)
- [Team](#team)
- [License](#license)
- [Acknowledgement](#acknowledgement)

---

## 🚀 Project Overview

The **AWS Serverless URL Shortener** is a cloud-native web application designed to demonstrate the implementation of a scalable, secure, and cost-efficient serverless architecture using **Amazon Web Services (AWS)**.

The platform enables authenticated users to:

- 🔐 Register and log in securely
- 🔗 Generate shortened URLs
- 🔄 Redirect users to original URLs
- 📊 Collect click analytics
- 📈 Monitor application health
- 🧮 Perform SQL analytics on click events

The solution is built entirely using **managed AWS services**, eliminating the need to provision or maintain servers. It follows the **AWS Well-Architected Framework** principles, ensuring operational excellence, security, reliability, performance efficiency, cost optimization, and sustainability.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🔐 **Secure Authentication** | User registration and login via Amazon Cognito with JWT token-based security |
| 🔗 **URL Shortening** | Automatic unique short-code generation for any valid URL |
| 🔄 **Instant Redirection** | High-performance HTTP 302 redirects to original URLs |
| 📊 **Event-Driven Analytics** | Click events captured via Amazon SQS and processed asynchronously |
| 💾 **Persistent Storage** | URL mappings stored in Amazon DynamoDB with automatic scaling |
| ⚡ **Fully Serverless** | Zero server management with AWS Lambda and managed services |
| 🌐 **React Frontend** | Modern responsive UI hosted on Amazon S3 |
| 🌍 **Global CDN** | Content delivery via Amazon CloudFront for low-latency access |
| 🏗️ **Infrastructure as Code** | Complete AWS SAM / CloudFormation templates |
| 🧮 **SQL Analytics** | Athena queries over analytics data stored in S3 |
| 📈 **Monitoring** | CloudWatch logs, metrics, and alarms |
| 🔍 **Distributed Tracing** | AWS X-Ray for end-to-end request tracing |
| 📈 **Auto Scaling** | Automatic scaling based on demand with no manual intervention |
| 🔄 **High Availability** | Multi-AZ deployment for resilience |
| 💰 **Cost Optimized** | Pay-per-use pricing model |

---

## 🏗️ System Architecture

<p align="center">
  <img src="assets/image_27.png" alt="System Architecture" width="900">
</p>

The application follows a **fully serverless event-driven architecture** deployed entirely on AWS. The architecture is designed for high availability, automatic scaling, and minimal operational overhead.

### Architecture Components

- **React Frontend** — Modern single-page application
- **Amazon S3** — Static website hosting for frontend assets
- **Amazon CloudFront** — Global content delivery network
- **Amazon Cognito** — User authentication and authorization
- **Amazon API Gateway** — RESTful API endpoints
- **AWS Lambda** — Serverless compute for business logic
- **Amazon DynamoDB** — NoSQL database for URL storage
- **Amazon SQS** — Message queue for click analytics events
- **Amazon Athena** — Serverless SQL query engine
- **Amazon CloudWatch** — Monitoring and observability
- **AWS X-Ray** — Distributed tracing

---

## 🔄 Architecture Workflow

### 1. User Access

The user accesses the React application hosted on **Amazon S3** and distributed globally through **Amazon CloudFront**.

```
User → CloudFront → S3 (React App)
```

### 2. User Authentication

**Amazon Cognito** authenticates users and returns a JWT token used for securing API requests.

```
User → Cognito → JWT Token → API Gateway
```

### 3. URL Shortening

The user submits a long URL. The request flows through the system:

```
React Frontend
    ↓
API Gateway (POST /shorten)
    ↓
Lambda (URL Shortener)
    ↓
DynamoDB (Store mapping)
```

The Lambda function:
- ✅ Validates the input URL
- ✅ Generates a unique shortcode
- ✅ Stores the mapping in DynamoDB
- ✅ Returns the shortened URL

### 4. Short URL Generation

The generated shortened URL is returned immediately to the frontend and displayed to the user.

### 5. URL Redirection

When users visit a shortened URL:

```
Browser (GET /{shortcode})
    ↓
API Gateway
    ↓
Redirect Lambda
    ↓
DynamoDB (Lookup original URL)
    ↓
HTTP 302 Redirect → Original URL
```

### 6. Event-Driven Analytics

Each redirect publishes a click event into **Amazon SQS**:

```
Redirect Lambda → SQS Queue → Analytics Lambda → S3 (Analytics Data)
```

### 7. Analytics Querying

**Amazon Athena** performs SQL queries over analytics data stored in S3:

```sql
SELECT shortcode, COUNT(*) as clicks
FROM analytics_data
GROUP BY shortcode
ORDER BY clicks DESC;
```

### 8. Monitoring & Observability

- **CloudWatch** collects logs, metrics, and alarms
- **AWS X-Ray** provides distributed tracing for every request

### 9. Infrastructure Provisioning

All cloud resources are provisioned using:

- **AWS SAM** — Serverless Application Model
- **AWS CloudFormation** — Infrastructure as Code

Enabling repeatable, version-controlled deployments.

---

## ☁️ AWS Services Used

| Service | Purpose | Badge |
|---------|---------|-------|
| **Amazon API Gateway** | REST API endpoints for frontend communication | ![API Gateway](https://img.shields.io/badge/API-Gateway-6A1B9A) |
| **AWS Lambda** | Serverless compute for URL shortening, redirection, and analytics | ![Lambda](https://img.shields.io/badge/AWS-Lambda-FF9900) |
| **Amazon DynamoDB** | NoSQL database for URL mappings and metadata | ![DynamoDB](https://img.shields.io/badge/Amazon-DynamoDB-4053D6) |
| **Amazon Cognito** | User authentication, registration, and JWT token management | ![Cognito](https://img.shields.io/badge/Amazon-Cognito-5A29E4) |
| **Amazon S3** | Static website hosting and analytics data lake | ![S3](https://img.shields.io/badge/Amazon-S3-569A31) |
| **Amazon CloudFront** | Global CDN for low-latency content delivery | ![CloudFront](https://img.shields.io/badge/Amazon-CloudFront-8C4FFF) |
| **Amazon SQS** | Message queue for decoupled click analytics | ![SQS](https://img.shields.io/badge/Amazon-SQS-FF4F8B) |
| **Amazon Athena** | Serverless SQL analytics over S3 data | ![Athena](https://img.shields.io/badge/Amazon-Athena-9B59B6) |
| **Amazon CloudWatch** | Logs, metrics, alarms, and dashboards | ![CloudWatch](https://img.shields.io/badge/Amazon-CloudWatch-FF4F8B) |
| **AWS X-Ray** | Distributed tracing and service maps | ![X-Ray](https://img.shields.io/badge/AWS-X--Ray-8C4FFF) |
| **AWS SAM** | Infrastructure as Code and deployment automation | ![SAM](https://img.shields.io/badge/AWS-SAM-FF9900) |

---

## 📁 Project Structure

```text
AWS-Serverless-URL-Shortener/
│
├── 📂 analytics/
│   ├── app.py                 # Analytics Lambda function
│   └── requirements.txt       # Python dependencies
│
├── 📂 hello_world/
│   ├── app.py                 # URL Shortener Lambda function
│   └── requirements.txt       # Python dependencies
│
├── 📂 redirect/
│   ├── app.py                 # Redirect Lambda function
│   └── requirements.txt       # Python dependencies
│
├── 📂 url-shortener-frontend/
│   ├── 📂 public/             # Static assets
│   ├── 📂 src/                # React components and logic
│   ├── package.json           # Node.js dependencies
│   └── package-lock.json      # Locked dependency versions
│
├── 📂 events/                 # Sample event payloads for testing
│
├── 📂 assets/                 # Screenshots and documentation images
│   ├── image_1.png            # Cover Page
│   ├── image_2.png            # Architecture Diagram
│   ├── image_3.png            # Login Page
│   ├── image_4.png            # URL Shortener Dashboard
│   ├── image_5.png            # Lambda Functions
│   ├── image_6.png            # API Gateway
│   ├── image_7.png            # DynamoDB Table
│   ├── image_8.png            # SQS Queue
│   ├── image_9.png            # S3 Bucket
│   ├── image_10.png           # Athena Query Editor
│   ├── image_11.png           # Cognito User Pool
│   ├── image_12.png           # CloudFront Distribution
│   ├── image_13.png           # CloudWatch Dashboard
│   ├── image_14.png           # X-Ray Service Map
│   ├── image_15.png           # CloudWatch Dashboard Metrics
│   ├── image_16.png           # Lambda Monitoring
│   ├── image_17.png           # API Metrics
│   ├── image_18.png           # Redirect Function
│   ├── image_19.png           # Analytics Lambda
│   ├── image_20.png           # URL Table Data
│   ├── image_21.png           # S3 Analytics Data
│   ├── image_22.png           # Athena Results
│   ├── image_23.png           # Cognito Authentication
│   ├── image_24.png           # CloudFront Cache
│   ├── image_25.png           # CloudWatch Logs
│   ├── image_26.png           # X-Ray Trace Details
│   └── image_27.png           # System Flowchart
│
├── template.yaml              # AWS SAM template (Infrastructure as Code)
├── samconfig.toml             # SAM deployment configuration
├── README.md                  # Project documentation
└── .gitignore                 # Git ignore rules
```

---

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | ^18.x | UI framework |
| HTML5 | — | Semantic markup |
| CSS3 | — | Styling and layout |
| JavaScript (ES6+) | — | Application logic |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.11+ | Lambda runtime |
| AWS Lambda | — | Serverless compute |
| REST APIs | — | API Gateway integration |

### Database
| Technology | Purpose |
|------------|---------|
| Amazon DynamoDB | URL mappings and metadata storage |
| Amazon S3 | Analytics data lake |

### DevOps & Infrastructure
| Technology | Purpose |
|------------|---------|
| AWS SAM | Infrastructure as Code |
| AWS CloudFormation | Resource provisioning |
| GitHub Actions | CI/CD (optional) |

---

## 📋 Prerequisites

Before deploying this project, ensure you have the following installed and configured:

- [AWS CLI](https://aws.amazon.com/cli/) — configured with appropriate credentials
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) — for building and deploying
- [Python 3.11+](https://www.python.org/downloads/) — for Lambda development
- [Node.js 18+](https://nodejs.org/) — for frontend development
- [npm](https://www.npmjs.com/) — for frontend dependency management
- An AWS account with appropriate permissions

---

## 🚀 Deployment

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/AWS-Serverless-URL-Shortener.git
cd AWS-Serverless-URL-Shortener
```

### Step 2: Build the Application

```bash
sam build
```

This command compiles the Lambda functions and prepares the deployment package.

### Step 3: Deploy with Guided Configuration

```bash
sam deploy --guided
```

You will be prompted to configure:

| Parameter | Description | Example |
|-------------|-------------|---------|
| Stack Name | CloudFormation stack name | `url-shortener-stack` |
| AWS Region | Deployment region | `us-east-1` |
| Confirm changes | Review before deployment | `Y` |
| Allow SAM CLI IAM role creation | Grant IAM permissions | `Y` |
| Save arguments | Store for future deployments | `Y` |

### Step 4: Deploy the Frontend

```bash
cd url-shortener-frontend
npm install
npm run build
aws s3 sync build/ s3://your-frontend-bucket-name --delete
```

### Step 5: Configure Cognito

1. Navigate to Amazon Cognito in the AWS Console
2. Create a new User Pool or use the one created by SAM
3. Configure the App Client settings
4. Update the frontend configuration with the Cognito details

### Step 6: Verify Deployment

1. Access the CloudFront distribution URL
2. Register a new user
3. Log in and test URL shortening
4. Verify redirection and analytics

### Step 7: Monitor

```bash
# View CloudWatch logs
sam logs --name URLShortenerFunction --tail

# View X-Ray traces
aws xray get-service-graph --start-time $(date -d '1 hour ago' +%s) --end-time $(date +%s)
```

---

## 📸 Screenshots

### Cover Page

<p align="center">
  <img src="assets/image_1.png" alt="Cover Page" width="800">
</p>

---

### Architecture Diagram

<p align="center">
  <img src="assets/image_2.png" alt="Architecture Diagram" width="800">
</p>

---

### Login Page

<p align="center">
  <img src="assets/image_3.png" alt="Login Page" width="800">
</p>

---

### URL Shortener Dashboard

<p align="center">
  <img src="assets/image_4.png" alt="URL Shortener Dashboard" width="800">
</p>

---

### Lambda Functions

<p align="center">
  <img src="assets/image_5.png" alt="Lambda Functions" width="800">
</p>

---

### API Gateway

<p align="center">
  <img src="assets/image_6.png" alt="API Gateway" width="800">
</p>

---

### DynamoDB Table

<p align="center">
  <img src="assets/image_7.png" alt="DynamoDB Table" width="800">
</p>

---

### Amazon SQS Queue

<p align="center">
  <img src="assets/image_8.png" alt="Amazon SQS" width="800">
</p>

---

### Amazon S3 Bucket

<p align="center">
  <img src="assets/image_9.png" alt="Amazon S3" width="800">
</p>

---

### Amazon Athena Query Editor

<p align="center">
  <img src="assets/image_10.png" alt="Amazon Athena" width="800">
</p>

---

### Amazon Cognito User Pool

<p align="center">
  <img src="assets/image_11.png" alt="Amazon Cognito" width="800">
</p>

---

### Amazon CloudFront Distribution

<p align="center">
  <img src="assets/image_12.png" alt="Amazon CloudFront" width="800">
</p>

---

### Amazon CloudWatch Dashboard

<p align="center">
  <img src="assets/image_13.png" alt="Amazon CloudWatch" width="800">
</p>

---

### AWS X-Ray Service Map

<p align="center">
  <img src="assets/image_14.png" alt="AWS X-Ray" width="800">
</p>

---

### CloudWatch Dashboard Metrics

<p align="center">
  <img src="assets/image_15.png" alt="CloudWatch Metrics" width="800">
</p>

---

### Lambda Monitoring

<p align="center">
  <img src="assets/image_16.png" alt="Lambda Monitoring" width="800">
</p>

---

### API Metrics

<p align="center">
  <img src="assets/image_17.png" alt="API Metrics" width="800">
</p>

---

### Redirect Lambda Function

<p align="center">
  <img src="assets/image_18.png" alt="Redirect Function" width="800">
</p>

---

### Analytics Lambda Function

<p align="center">
  <img src="assets/image_19.png" alt="Analytics Lambda" width="800">
</p>

---

### DynamoDB URL Table Data

<p align="center">
  <img src="assets/image_20.png" alt="DynamoDB Data" width="800">
</p>

---

### S3 Analytics Data

<p align="center">
  <img src="assets/image_21.png" alt="S3 Analytics" width="800">
</p>

---

### Athena Query Results

<p align="center">
  <img src="assets/image_22.png" alt="Athena Results" width="800">
</p>

---

### Cognito Authentication Flow

<p align="center">
  <img src="assets/image_23.png" alt="Cognito Authentication" width="800">
</p>

---

### CloudFront Cache Behavior

<p align="center">
  <img src="assets/image_24.png" alt="CloudFront Cache" width="800">
</p>

---

### CloudWatch Logs

<p align="center">
  <img src="assets/image_25.png" alt="CloudWatch Logs" width="800">
</p>

---

### X-Ray Trace Details

<p align="center">
  <img src="assets/image_26.png" alt="X-Ray Traces" width="800">
</p>

---

### System Flowchart

<p align="center">
  <img src="assets/image_27.png" alt="System Flowchart" width="800">
</p>

---

## 💰 Cost Management Notice

> ⚠️ **Important:** This project uses multiple AWS services that may incur charges. To avoid unexpected costs:
>
> - Monitor your AWS billing dashboard regularly
> - Set up billing alerts and budgets
> - Delete resources when not in use: `sam delete`
> - Use the AWS Free Tier where eligible
> - Consider using DynamoDB on-demand capacity for development
> - Enable S3 lifecycle policies for analytics data

---

## 🔮 Future Enhancements

- [ ] **Custom Short URLs** — Allow users to define their own shortcodes
- [ ] **URL Expiration** — Set time-to-live (TTL) for shortened URLs
- [ ] **Rate Limiting** — Implement throttling per user/API key
- [ ] **QR Code Generation** — Auto-generate QR codes for each short URL
- [ ] **Advanced Analytics** — Geographic and device-based click analytics
- [ ] **URL Preview** — Show destination preview before redirection
- [ ] **Bulk URL Shortening** — Support batch operations
- [ ] **API Keys** — Developer API access with rate limits
- [ ] **Dark Mode** — UI theme toggle
- [ ] **PWA Support** — Progressive Web App capabilities
- [ ] **Multi-Region Deployment** — Global availability with DynamoDB Global Tables
- [ ] **CI/CD Pipeline** — GitHub Actions for automated deployment

---

## 👥 Team

This project was developed as part of a cloud computing curriculum to demonstrate serverless architecture patterns and AWS best practices.

| Role | Responsibility |
|------|----------------|
| **Cloud Architect** | System design and AWS service selection |
| **Backend Developer** | Lambda functions and API development |
| **Frontend Developer** | React application and UI/UX |
| **DevOps Engineer** | Infrastructure as Code and deployment |

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024 AWS Serverless URL Shortener Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgement

We would like to express our sincere gratitude to:

- **Amazon Web Services (AWS)** for providing the cloud infrastructure and comprehensive documentation
- **AWS SAM Team** for the Serverless Application Model that simplifies deployment
- **The open-source community** for the tools and libraries that made this project possible
- **Our instructors and mentors** for their guidance throughout this project

Special thanks to the creators of:
- [React](https://react.dev/)
- [AWS SAM](https://aws.amazon.com/serverless/sam/)
- [Boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html)

---

<p align="center">
  <b>Built with ❤️ on AWS Serverless</b>
</p>

<p align="center">
  <a href="#aws-serverless-url-shortener-with-usage-analytics">⬆ Back to Top</a>
</p>
