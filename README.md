<div align="center">

<img src="https://img.shields.io/badge/AWS-Serverless-orange?logo=amazonaws&style=for-the-badge" alt="AWS Serverless">
<img src="https://img.shields.io/badge/Python-3.x-blue?logo=python&style=for-the-badge" alt="Python">
<img src="https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&style=for-the-badge" alt="React">

<br><br>

<img src="https://img.shields.io/badge/AWS-Lambda-FF9900?logo=awslambda&style=for-the-badge" alt="AWS Lambda">
<img src="https://img.shields.io/badge/API-Gateway-6A1B9A?logo=amazonapigateway&style=for-the-badge" alt="API Gateway">
<img src="https://img.shields.io/badge/Amazon-DynamoDB-4053D6?logo=amazondynamodb&style=for-the-badge" alt="DynamoDB">

<br><br>

<img src="https://img.shields.io/badge/Amazon-S3-569A31?logo=amazons3&style=for-the-badge" alt="S3">
<img src="https://img.shields.io/badge/Amazon-CloudFront-8C4FFF?logo=amazoncloudfront&style=for-the-badge" alt="CloudFront">
<img src="https://img.shields.io/badge/Amazon-Cognito-5A29E4?logo=amazoncognito&style=for-the-badge" alt="Cognito">

<br><br>

<img src="https://img.shields.io/badge/Amazon-SQS-FF4F8B?logo=amazonsqs&style=for-the-badge" alt="SQS">
<img src="https://img.shields.io/badge/Amazon-Athena-9B59B6?logo=amazonaws&style=for-the-badge" alt="Athena">
<img src="https://img.shields.io/badge/Amazon-CloudWatch-FF4F8B?logo=amazoncloudwatch&style=for-the-badge" alt="CloudWatch">
<img src="https://img.shields.io/badge/AWS-X--Ray-8C4FFF?logo=amazonaws&style=for-the-badge" alt="X-Ray">

<br><br>

</div>

---

<div align="center">

# ⚡ AWS Serverless URL Shortener with Usage Analytics ⚡

### 🚀 A cloud-native, fully serverless URL shortening platform built on Amazon Web Services 🚀

<br>

[📖 Overview](#project-overview) • 
[✨ Features](#key-features) • 
[🏗️ Architecture](#system-architecture) • 
[🚀 Deployment](#deployment) • 
[📸 Screenshots](#screenshots) • 
[🛠️ Tech Stack](#technology-stack)

<br>

<img src="https://user-images.githubusercontent.com/placeholder.gif" width="0" height="0" alt="">

</div>

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

<div align="center">

## Project Overview

</div>

The **AWS Serverless URL Shortener** is a cloud-native web application designed to demonstrate the implementation of a scalable, secure, and cost-efficient serverless architecture using **Amazon Web Services (AWS)**.

The platform enables authenticated users to generate shortened URLs, seamlessly redirect users to the original destination, and collect click analytics through an event-driven processing pipeline.

The solution is built using AWS Lambda for serverless compute, Amazon API Gateway for RESTful API management, Amazon Cognito for user authentication, Amazon DynamoDB for URL storage, Amazon S3 and Amazon CloudFront for frontend hosting and content delivery, Amazon SQS for asynchronous event processing, Amazon Athena for analytical querying, and Amazon CloudWatch for monitoring and operational insights.

By leveraging fully managed AWS services, the application achieves automatic scalability, high availability, enhanced security, and reduced operational overhead while eliminating the need to provision or maintain servers. The project demonstrates modern serverless application development, infrastructure automation using AWS SAM, and cloud-native design principles aligned with industry best practices.

---

<div align="center">

## Key Features

</div>

<div align="center">

| 🔐 Secure Authentication | 🔗 URL Shortening | 🔄 Instant Redirection |
|:---:|:---:|:---:|
| Amazon Cognito with JWT | Unique short-code generation | HTTP 302 redirects |

| 📊 Event-Driven Analytics | 💾 Persistent Storage | ⚡ Fully Serverless |
|:---:|:---:|:---:|
| Amazon SQS + Lambda | Amazon DynamoDB | Zero server management |

| 🌐 React Frontend | 🌍 Global CDN | 🏗️ Infrastructure as Code |
|:---:|:---:|:---:|
| Hosted on S3 | Amazon CloudFront | AWS SAM + CloudFormation |

| 🧮 SQL Analytics | 📈 Monitoring | 🔍 Distributed Tracing |
|:---:|:---:|:---:|
| Amazon Athena | CloudWatch + Alarms | AWS X-Ray |

| 📈 Auto Scaling | 🔄 High Availability | 💰 Cost Optimized |
|:---:|:---:|:---:|
| Automatic demand scaling | Multi-AZ deployment | Pay-per-use pricing |

</div>

---

<div align="center">

## System Architecture

</div>

<div align="center">

<img src="assets/image_27.png" alt="System Architecture" width="900">

<br><br>

**Fully serverless event-driven architecture deployed entirely on AWS**

</div>

### Architecture Components

<div align="center">

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         USER LAYER                                      │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐               │
│  │   Browser   │───▶│  CloudFront │───▶│     S3      │               │
│  │             │    │    (CDN)    │    │  (React UI) │               │
│  └─────────────┘    └─────────────┘    └─────────────┘               │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      AUTHENTICATION LAYER                               │
│                         Amazon Cognito                                  │
│                    (JWT Token Management)                                 │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        API LAYER                                        │
│                      API Gateway                                        │
│              (REST Endpoints / Lambda Proxy)                            │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     COMPUTE LAYER (AWS Lambda)                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐       │
│  │ URL Shortener   │  │ URL Redirect    │  │ Analytics       │       │
│  │   Function      │  │   Function      │  │   Function      │       │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘       │
└─────────────────────────────────────────────────────────────────────────┘
           │                      │                      │
           ▼                      ▼                      ▼
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   DynamoDB      │      │   DynamoDB      │      │     S3          │
│  (URL Storage)  │      │  (URL Lookup)   │      │ (Analytics Data)│
└─────────────────┘      └─────────────────┘      └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │      SQS        │
                       │  (Event Queue)  │
                       └─────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                    ANALYTICS & MONITORING LAYER                         │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐               │
│  │   Athena    │    │ CloudWatch  │    │   X-Ray     │               │
│  │ (SQL Query) │    │(Logs/Metrics│    │   (Trace)   │               │
│  └─────────────┘    └─────────────┘    └─────────────┘               │
└─────────────────────────────────────────────────────────────────────────┘
```

</div>

---

<div align="center">

## Architecture Workflow

</div>

<div align="center">

| Step | Action | Service |
|:----:|--------|---------|
| **1** | 👤 User accesses React app | `CloudFront → S3` |
| **2** | 🔐 User logs in via Cognito | `Cognito → JWT Token` |
| **3** | 🔗 Submit long URL | `API Gateway → Lambda → DynamoDB` |
| **4** | ✨ Short URL generated | `Returned to Frontend` |
| **5** | 🔄 Short URL accessed | `API Gateway → Lambda → DynamoDB → 302 Redirect` |
| **6** | 📊 Click event published | `SQS → Analytics Lambda → S3` |
| **7** | 🧮 Query analytics | `Athena over S3 Data` |
| **8** | 📈 Monitor & trace | `CloudWatch + X-Ray` |
| **9** | 🏗️ Infrastructure managed | `SAM + CloudFormation` |

</div>

---

<div align="center">

## AWS Services Used

</div>

<div align="center">

| Service | Purpose |
|:-------:|---------|
| <img src="https://img.shields.io/badge/API-Gateway-6A1B9A?logo=amazonapigateway&style=flat-square" height="22"> | REST API endpoints for frontend communication |
| <img src="https://img.shields.io/badge/AWS-Lambda-FF9900?logo=awslambda&style=flat-square" height="22"> | Serverless compute for URL shortening, redirection, and analytics |
| <img src="https://img.shields.io/badge/Amazon-DynamoDB-4053D6?logo=amazondynamodb&style=flat-square" height="22"> | NoSQL database for URL mappings and metadata |
| <img src="https://img.shields.io/badge/Amazon-Cognito-5A29E4?logo=amazoncognito&style=flat-square" height="22"> | User authentication, registration, and JWT token management |
| <img src="https://img.shields.io/badge/Amazon-S3-569A31?logo=amazons3&style=flat-square" height="22"> | Static website hosting and analytics data lake |
| <img src="https://img.shields.io/badge/Amazon-CloudFront-8C4FFF?logo=amazoncloudfront&style=flat-square" height="22"> | Global CDN for low-latency content delivery |
| <img src="https://img.shields.io/badge/Amazon-SQS-FF4F8B?logo=amazonsqs&style=flat-square" height="22"> | Message queue for decoupled click analytics |
| <img src="https://img.shields.io/badge/Amazon-Athena-9B59B6?logo=amazonaws&style=flat-square" height="22"> | Serverless SQL analytics over S3 data |
| <img src="https://img.shields.io/badge/Amazon-CloudWatch-FF4F8B?logo=amazoncloudwatch&style=flat-square" height="22"> | Logs, metrics, alarms, and dashboards |
| <img src="https://img.shields.io/badge/AWS-X--Ray-8C4FFF?logo=amazonaws&style=flat-square" height="22"> | Distributed tracing and service maps |
| <img src="https://img.shields.io/badge/AWS-SAM-FF9900?logo=amazonaws&style=flat-square" height="22"> | Infrastructure as Code and deployment automation |

</div>

---

<div align="center">

## Project Structure

</div>

```text
AWS-Serverless-URL-Shortener/
│
├── 📂 analytics/                 # Analytics Lambda Function
│   ├── app.py
│   └── requirements.txt
│
├── 📂 hello_world/               # URL Shortening Lambda Function
│   ├── app.py
│   └── requirements.txt
│
├── 📂 redirect/                  # URL Redirection Lambda Function
│   ├── app.py
│   └── requirements.txt
│
├── 📂 url-shortener-frontend/    # React Frontend Application
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
│
├── 📂 events/                    # Sample API events
│
├── 📄 template.yaml              # AWS SAM Infrastructure Template
├── 📄 samconfig.toml             # SAM Deployment Configuration
├── 📄 README.md                  # Project Documentation
└── 📄 .gitignore                 # Git Ignore Rules
```

> **analytics/** — Used to process click events received from Amazon SQS and store analytics data in Amazon S3 for reporting and analysis.
>
> **hello_world/** — Used to implement the URL shortening service by validating user input, generating unique short codes, and storing URL mappings in Amazon DynamoDB.
>
> **redirect/** — Used to retrieve the original URL associated with a short code, update click statistics, and redirect users to the destination website.
>
> **url-shortener-frontend/** — Used to host the React-based frontend application, providing the user interface for authentication, URL shortening, and URL management.
>
> **events/** — Used to store sample event payloads for local testing and debugging of AWS Lambda functions.
>
> **template.yaml** — Used to define the complete serverless infrastructure, including AWS Lambda, API Gateway, DynamoDB, SQS, IAM policies, and other AWS resources using AWS SAM.
>
> **samconfig.toml** — Used to store AWS SAM deployment configurations, simplifying the build and deployment process.
>
> **README.md** — Used to provide project documentation, including the architecture, setup instructions, deployment steps, and usage guidelines.
>
> **.gitignore** — Used to specify files and directories that should be excluded from version control to maintain a clean repository.

---

<div align="center">

## Workflow

</div>

<div align="center">

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   USER      │────▶│  COGNITO    │────▶│   LOGIN     │────▶│  DASHBOARD  │
│             │     │  (JWT Auth) │     │  (Success)  │     │             │
└─────────────┘     └─────────────┘     └─────────────┘     └──────┬──────┘
                                                                   │
                                                                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  SHORT URL  │◀────│   LAMBDA    │◀────│ API GATEWAY │◀────│ SUBMIT URL  │
│  GENERATED  │     │  (Validate) │     │  (POST /)   │     │  (Long URL) │
└──────┬──────┘     └─────────────┘     └─────────────┘     └─────────────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   VISITOR   │────▶│   REDIRECT  │────▶│  DYNAMODB   │────▶│  ORIGINAL   │
│  (Short URL)│     │   LAMBDA    │     │   LOOKUP    │     │    URL      │
└─────────────┘     └──────┬──────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
                    │     SQS     │────▶│  ANALYTICS  │────▶│     S3      │
                    │  (Event)    │     │   LAMBDA    │     │  (Store)    │
                    └─────────────┘     └─────────────┘     └──────┬──────┘
                                                                   │
                                                                   ▼
                                                           ┌─────────────┐
                                                           │   ATHENA    │
                                                           │ (SQL Query) │
                                                           └─────────────┘
```

</div>

1. **User Authentication** — Users securely register and log in through **Amazon Cognito**, which authenticates requests using JWT tokens.

2. **URL Shortening** — Authenticated users submit a long URL via the React frontend. The request is routed through **Amazon API Gateway** to an **AWS Lambda** function, which validates the URL, generates a unique short code, and stores the mapping in **Amazon DynamoDB**.

3. **Short URL Generation** — The generated short URL is returned to the frontend, allowing users to copy and share it instantly.

4. **URL Redirection** — When a shortened URL is accessed, **API Gateway** invokes the Redirect Lambda function, which retrieves the original URL from **Amazon DynamoDB** and redirects the user using an HTTP 302 response.

5. **Click Analytics Processing** — During every successful redirection, the Redirect Lambda publishes a click event to **Amazon SQS**. The Analytics Lambda processes these events asynchronously and stores analytics data in **Amazon S3**.

6. **Analytics and Monitoring** — Analytics data stored in Amazon S3 can be queried using **Amazon Athena**, while **Amazon CloudWatch** and **AWS X-Ray** provide application monitoring, logging, and performance insights.

7. **Infrastructure Deployment** — The complete serverless infrastructure is provisioned and managed using **AWS SAM** and **AWS CloudFormation**, enabling automated deployment and simplified infrastructure management.

---

<div align="center">

## Technology Stack

</div>

<div align="center">

### 🎨 Frontend

<img src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB&style=for-the-badge" alt="React">
<img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white&style=for-the-badge" alt="HTML5">
<img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white&style=for-the-badge" alt="CSS3">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge" alt="JavaScript">

<br><br>

### ⚙️ Backend

<img src="https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white&style=for-the-badge" alt="Python">
<img src="https://img.shields.io/badge/AWS_Lambda-FF9900?logo=awslambda&logoColor=white&style=for-the-badge" alt="AWS Lambda">
<img src="https://img.shields.io/badge/REST_API-6A1B9A?logo=fastapi&logoColor=white&style=for-the-badge" alt="REST APIs">

<br><br>

### 💾 Database

<img src="https://img.shields.io/badge/Amazon_DynamoDB-4053D6?logo=amazondynamodb&logoColor=white&style=for-the-badge" alt="DynamoDB">

<br><br>

### ☁️ Cloud Services

<img src="https://img.shields.io/badge/Amazon_API_Gateway-6A1B9A?logo=amazonapigateway&logoColor=white&style=for-the-badge" alt="API Gateway">
<img src="https://img.shields.io/badge/Amazon_S3-569A31?logo=amazons3&logoColor=white&style=for-the-badge" alt="S3">
<img src="https://img.shields.io/badge/Amazon_CloudFront-8C4FFF?logo=amazoncloudfront&logoColor=white&style=for-the-badge" alt="CloudFront">
<img src="https://img.shields.io/badge/Amazon_Cognito-5A29E4?logo=amazoncognito&logoColor=white&style=for-the-badge" alt="Cognito">
<img src="https://img.shields.io/badge/Amazon_SQS-FF4F8B?logo=amazonsqs&logoColor=white&style=for-the-badge" alt="SQS">
<img src="https://img.shields.io/badge/Amazon_Athena-9B59B6?logo=amazonaws&logoColor=white&style=for-the-badge" alt="Athena">
<img src="https://img.shields.io/badge/Amazon_CloudWatch-FF4F8B?logo=amazoncloudwatch&logoColor=white&style=for-the-badge" alt="CloudWatch">
<img src="https://img.shields.io/badge/AWS_X--Ray-8C4FFF?logo=amazonaws&logoColor=white&style=for-the-badge" alt="X-Ray">
<img src="https://img.shields.io/badge/AWS_SAM-FF9900?logo=amazonaws&logoColor=white&style=for-the-badge" alt="AWS SAM">

<br><br>

> **Amazon CloudWatch Dashboard** provides real-time visualization of application metrics including Lambda invocations, execution duration, API request count, latency, backend processing time, and error rates. It serves as the operational monitoring dashboard for the serverless application.

</div>

---

<div align="center">

## Prerequisites

</div>

Before deploying this project, ensure you have the following installed and configured:

- ✅ AWS CLI configured with valid credentials
- ✅ AWS SAM CLI installed
- ✅ Python 3.x
- ✅ Node.js and npm
- ✅ Git

---

<div align="center">

## Deployment

</div>

The application is deployed using **AWS Serverless Application Model (AWS SAM)** and follows a fully serverless deployment workflow.

### 📥 Clone the Repository

```bash
git clone <repository-url>
cd AWS-Serverless-URL-Shortener
```

### 🔨 Build the Serverless Application

```bash
sam build
```

### 🚀 Deploy to AWS

**For the first deployment:**

```bash
sam deploy --guided
```

**For subsequent deployments:**

```bash
sam deploy
```

### 🌐 Frontend Deployment

Navigate to the frontend directory:

```bash
cd url-shortener-frontend
```

Install dependencies:

```bash
npm install
```

Build the React application:

```bash
npm run build
```

Upload the production build to the S3 bucket:

```bash
aws s3 sync build/ s3://<your-s3-bucket-name> --delete
```

Invalidate the CloudFront cache:

```bash
aws cloudfront create-invalidation   --distribution-id <your-distribution-id>   --paths "/*"
```

### ✅ Verify Deployment

- [ ] Open the CloudFront URL
- [ ] Register or log in using Amazon Cognito
- [ ] Generate a shortened URL
- [ ] Verify URL redirection
- [ ] Confirm analytics are processed through Amazon SQS and AWS Lambda
- [ ] Monitor logs and metrics using Amazon CloudWatch

---

<div align="center">

## Screenshots

</div>

---


### 🔐 Figure 1. User Authentication Interface

<div align="center">

<img src="assets/image_1.png" alt="User Authentication Interface" width="800">

<br><br>

> The React-based login interface secured using Amazon Cognito enables authenticated access to the URL shortening platform through JWT-based user authentication.

</div>

---

### 🔗 Figure 2. URL Shortening Dashboard

<div align="center">

<img src="assets/image_2.png" alt="URL Shortening Dashboard" width="800">

<br><br>

> Authenticated users can submit long URLs to generate unique shortened links. The application also displays the generated URL and corresponding QR code for convenient sharing.

</div>

---

### ⚡ Figure 3. AWS Lambda Functions

<div align="center">

<img src="assets/image_3.png" alt="AWS Lambda Functions" width="800">

<br><br>

> AWS Lambda functions implement the core serverless backend, including URL shortening, URL redirection, and click analytics processing without requiring server management.

</div>

---

### 🌐 Amazon API Gateway

<div align="center">

<img src="assets/image_4.png" alt="Amazon API Gateway" width="800">

<br>

<img src="assets/image_5.png" alt="Amazon API Gateway" width="800">

<br><br>

> Amazon API Gateway exposes secure REST endpoints that route client requests to the appropriate AWS Lambda functions for URL shortening and redirection.

</div>

---

### 💾 Figure 5. Amazon DynamoDB Table

<div align="center">

<img src="assets/image_6.png" alt="Amazon DynamoDB Table" width="800">

<br><br>

> Amazon DynamoDB stores URL mappings, including generated short codes, original URLs, and click statistics using a fully managed NoSQL database.

</div>

---

### 💾 Amazon DynamoDB (Additional Views)

<div align="center">

<img src="assets/image_7.png" alt="Amazon DynamoDB" width="800">

<br>

<img src="assets/image_8.png" alt="Amazon DynamoDB" width="800">

<br>

<img src="assets/image_9.png" alt="Amazon DynamoDB" width="800">

</div>

---

### 📨 Amazon SQS

<div align="center">

<img src="assets/image_10.png" alt="Amazon SQS" width="800">

<br>

<img src="assets/image_11.png" alt="Amazon SQS" width="800">

</div>

---

### 📦 Amazon S3

<div align="center">

<img src="assets/image_12.png" alt="Amazon S3" width="800">

<br>

<img src="assets/image_13.png" alt="Amazon S3" width="800">

<br>

<img src="assets/image_14.png" alt="Amazon S3" width="800">

<br>

<img src="assets/image_15.png" alt="Amazon S3" width="800">

</div>

---

### 🧮 Amazon Athena

<div align="center">

<img src="assets/image_16.png" alt="Amazon Athena" width="800">

<br>

<img src="assets/image_17.png" alt="Amazon Athena" width="800">

</div>

---

### 🔐 Amazon Cognito

<div align="center">

<img src="assets/image_18.png" alt="Amazon Cognito" width="800">

</div>

---

### 🌍 Amazon CloudFront

<div align="center">

<img src="assets/image_19.png" alt="Amazon CloudFront" width="800">

</div>

---

### 📈 Amazon CloudWatch

<div align="center">

<img src="assets/image_20.png" alt="Amazon CloudWatch" width="800">

<br>

<img src="assets/image_21.png" alt="Amazon CloudWatch" width="800">

<br>

<img src="assets/image_22.png" alt="Amazon CloudWatch" width="800">

</div>

---

### 🔍 AWS X-Ray

<div align="center">

<img src="assets/image_23.png" alt="AWS X-Ray" width="800">

<br>

<img src="assets/image_24.png" alt="AWS X-Ray" width="800">

<br>

<img src="assets/image_26.png" alt="AWS X-Ray" width="800">

</div>

---

### 📊 CloudWatch Dashboard (instead of QuickSight)

<div align="center">

<img src="assets/image_25.png" alt="CloudWatch Dashboard" width="800">

<br><br>

> Amazon CloudWatch Dashboard provides real-time visualization of application metrics including Lambda invocations, execution duration, API request count, latency, backend processing time, and error rates. It serves as the operational monitoring dashboard for the serverless application.

</div>

---

<div align="center">

## Cost Management Notice

</div>

> ⚠️ **Important:** This project uses AWS cloud services. Some AWS resources may incur charges beyond the AWS Free Tier depending on usage.
>
> After project evaluation, the following resources can be disabled or deleted to avoid unnecessary costs:
>
> - Amazon CloudFront Distribution (optional)
> - Amazon API Gateway
> - AWS Lambda Functions
> - Amazon DynamoDB Tables
> - Amazon SQS Queue
> - Amazon S3 Buckets
> - Amazon Cognito User Pool (optional)
> - Amazon CloudWatch Logs and Dashboards
> - AWS X-Ray Traces
>
> The entire infrastructure can be recreated at any time using the provided AWS SAM template.

---

<div align="center">

## Future Enhancements

</div>

<div align="center">

| 🎯 Feature | 📋 Description |
|:----------:|:---------------|
| 🌐 **Amazon Route 53** | Custom domain hosting |
| 📱 **QR Code Generation** | Auto-generate QR codes for each short URL |
| ⏰ **URL Expiration** | Set time-to-live or usage limits |
| ✏️ **Custom Short URLs** | User-defined shortcodes |
| 📊 **QuickSight Dashboard** | Advanced business intelligence dashboards |
| 📈 **Advanced Analytics** | Geographic and device-based insights |
| 📲 **Mobile Application** | Native iOS/Android apps |
| 🌍 **Multi-Region Deployment** | Global availability with DynamoDB Global Tables |

</div>

---

<div align="center">

## Team

</div>

<div align="center">

| 👤 Team Member |
|:--------------:|
| Swastisikha Pradhan |
| Debiprasad Brahma |
| Nirmalya Kumar Mohanty |
| Sai Shruti Barik |
| Pedenti Nanda Kishore |
| Sumit Kumar Mishra |

</div>

---

<div align="center">

## License

</div>

This project was developed as part of the **TCS Capstone Project** for educational purposes.

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

<div align="center">

## Acknowledgement

</div>

This project was developed as part of the **TCS Capstone Program** to demonstrate the design and implementation of a scalable, cloud-native serverless application using Amazon Web Services (AWS). It showcases modern serverless architecture through event-driven processing, Infrastructure as Code (AWS SAM), secure authentication, distributed analytics, monitoring, logging, and global content delivery while following cloud-native design principles and industry best practices.

---

<div align="center">

### Built with ❤️ on AWS Serverless

<br>

[⬆ Back to Top](#aws-serverless-url-shortener-with-usage-analytics)

</div>
