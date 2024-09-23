# Serverless Image Recognition App

This project demonstrates how to build a serverless image recognition app using AWS services like Lambda, S3, Rekognition, and API Gateway. Users can upload images to an S3 bucket, and the app will analyze the images using AWS Rekognition, returning metadata like labels and detected objects.

## AWS Services Used

- **S3**: Store uploaded images.
- **Lambda**: Process image uploads and call AWS Rekognition.
- **Rekognition**: Analyze images to detect objects, labels, and faces.
- **API Gateway**: Expose a REST API to trigger Lambda and process image uploads.
- **CloudFormation**: Automate deployment of the entire infrastructure.
- **CloudWatch**: Monitor Lambda execution and log outputs.

## Architecture Overview

1. Users upload an image via a frontend (not included here, but an S3 static website can host it).
2. The uploaded image is stored in an S3 bucket.
3. The image upload triggers a Lambda function.
4. The Lambda function calls AWS Rekognition to analyze the image and detect labels.
5. Results (detected labels, objects, or faces) are returned via API Gateway or logged.

```mermaid
flowchart TD
    A[User] -->|Uploads Image| B[HTML/JS Frontend]
    B -->|Sends HTTP Request| C[API Gateway]
    C -->|Uploads Image| E[S3 Bucket - Image Storage]
    E -->|Triggers| D[AWS Lambda - Image Processing]
    D -->|Analyzes Image| F[AWS Rekognition - Image Analysis]
    F -->|Returns Labels/Objects| D
    D -->|Stores Results (Optional)| G[DynamoDB (Optional)]
    D -->|Returns Results| C
    C -->|Returns Response| B
    D -->|Logs Execution| H[CloudWatch - Logs]
    C -->|Uses AWS WAF to Protect API| W[Web Application Firewall (WAF)]
```

## Setup

1. **Lambda Function**: The Python Lambda function (`lambda_function.py`) uses Boto3 to interact with S3 and Rekognition.
2. **API Gateway**: It exposes an API that allows users to upload images and see the analysis results.
3. **S3**: The bucket is set up to trigger Lambda on image uploads.

### Prerequisites

- **AWS CLI**: To deploy the CloudFormation stack and manage AWS resources.
- **AWS Account**: Ensure you have access to AWS resources like Lambda, S3, and Rekognition.

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repo/serverless-image-recognition-app.git
   cd serverless-image-recognition-app

2. **Package and Deploy CloudFormation Stack**

First, package your Lambda function and upload it to an S3 bucket:

```bash
aws cloudformation package \
    --template-file template.yaml \
    --s3-bucket your-s3-bucket \
    --output-template-file packaged-template.yaml
```
Then deploy the stack:

```bash
aws cloudformation deploy \
    --template-file packaged-template.yaml \
    --stack-name ImageRecognitionApp \
    --capabilities CAPABILITY_IAM
```

3. **Upload Lambda Code**
Upload your Lambda function code (`lambda_function.py`) as a zip file to an S3 bucket.

4. **Access the App**

Once the CloudFormation stack is deployed, you will have:

- An S3 bucket for image uploads.
- An API Gateway endpoint for interacting with the app.
- A Lambda function for processing image recognition.
- Frontend: The `index.html` and `app.js` files can be hosted in an S3 bucket using static website hosting.

### Deployment Strategy
1. CloudFormation: Automates the creation of all AWS resources. You simply need to package the template and deploy it using AWS CLI.
2. S3 Hosting: You can host the frontend (HTML/JavaScript) on S3 as a static website.
3. API Gateway: Exposes an API for uploading images and getting analysis results.
4. Monitoring: Use AWS CloudWatch to track Lambda function executions and any potential errors.

### Optional Enhancements
1. Cognito for Authentication: Add authentication via AWS Cognito to secure your app.
2. DynamoDB: Store image metadata and results for querying.
Frontend: Create a frontend in React or static HTML hosted in S3.

### Cleanup
To avoid incurring costs, remember to delete the CloudFormation stack after testing.

```bash
aws cloudformation delete-stack --stack-name ImageRecognitionApp
```
