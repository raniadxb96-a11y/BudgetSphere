
# Welcome to Smart Expense Tracker with Budget Insights!

Hey there! 👋 This project is all about making your financial life easier. With Smart Expense Tracker, you can keep tabs on your daily spending, set monthly budgets, and get smart insights—all powered by the cloud and AWS magic.

---

## 🌟 What Can You Do Here?

- **Track your expenses:** Log every coffee, cab, or grocery run in seconds.
- **Set budgets:** Decide how much you want to spend each month and get notified if you go over.
- **Scan receipts:** Just snap a photo—our app uses AWS Textract to read and categorize your expenses automatically.
- **See your spending trends:** Beautiful charts and reports (thanks to Amazon QuickSight) help you understand where your money goes.
- **Store everything securely:** All your receipts and docs are safe in Amazon S3, and only you can access them.
- **Global access:** Fast, secure access anywhere in the world via CloudFront.
- **Stay private:** Your data is protected with Cognito authentication.
- **Get alerts:** If you bust your budget, you’ll get a friendly nudge via SNS.

---


## 🏗️ How It Works (Architecture)

### High-Level AWS Deployment Flow

1. **User Interaction:**
	- Users access the Angular app via a CloudFront distribution, which serves the static site from an S3 bucket for fast, global delivery.
	- Authentication is handled by Amazon Cognito, ensuring secure access to user-specific features and data.

2. **Receipt Upload & OCR:**
	- Users upload receipt images through the Angular app.
	- Images are sent directly to an S3 bucket (using signed URLs or via API Gateway).
	- An S3 event triggers an AWS Lambda function, which calls AWS Textract to extract text and data from the receipt.

3. **Expense Processing & Storage:**
	- The Lambda function parses the Textract output, categorizes the expense, and updates the user's records in DynamoDB.
	- DynamoDB stores all expense and budget data, indexed by user.

4. **Budget Monitoring & Alerts:**
	- Another Lambda function (or Step Function workflow) monitors expenses against user budgets.
	- If a user exceeds their budget, the function publishes a notification to an SNS topic, which sends alerts (email/SMS/push).

5. **Reporting & Insights:**
	- Expense data in DynamoDB is visualized using Amazon QuickSight dashboards, which users can access via secure links or embedded views in the app.

6. **API Gateway:**
	- API Gateway exposes RESTful endpoints for the Angular app to interact with backend services (e.g., fetch expenses, update budgets, trigger reports).
	- All endpoints are protected with Cognito authorizers for security.

7. **Step Functions (Optional):**
	- For complex workflows (e.g., multi-step receipt processing, batch reporting), AWS Step Functions orchestrate Lambda invocations and error handling.

### Diagram (Textual)

```
User (Browser)
	|
	v
CloudFront
	|
	v
S3 (Static Site Hosting)
	|
	v
Angular App
	|
	v
Cognito (Auth) <-------------------+
	|                               |
	v                               |
API Gateway <----------------------+ (REST API)
	|
	v
Lambda (Receipt Processing)
	|
	v
Textract (OCR)
	|
	v
Lambda (Expense Categorization)
	|
	v
DynamoDB (Expense Data)
	|
	v
Step Functions (Workflow) <---+
	|                          |
	v                          |
SNS (Budget Alerts)           |
	|                          |
	v                          |
User (Notification)           |
										|
QuickSight (Reports) <--------+
```

---

### Key AWS Resources & Roles
- **S3 Buckets:**
  - One for static site hosting (Angular app)
  - One for receipt/document uploads
- **CloudFront:** Distributes the Angular app globally
- **Cognito:** Manages user authentication and authorization
- **API Gateway:** Secure API endpoints for app/backend communication
- **Lambda Functions:**
  - Receipt upload handler
  - Textract OCR processor
  - Expense categorizer/updater
  - Budget monitor/alert sender
- **DynamoDB:** Stores all expense and budget data
- **SNS:** Sends budget alerts to users
- **QuickSight:** Visualizes expense data
- **Step Functions:** Orchestrates multi-step workflows

---

---

## 🚀 Getting Started

Ready to roll? Here’s how:

1. **Clone the repo & install dependencies:**
	 ```bash
	 npm install
	 ```
2. **Build the Angular app:**
	 ```bash
	 ng build --configuration production
	 ```
3. **Deploy:** Upload the `/dist` folder to your S3 bucket (set up for static website hosting).
4. **Set up AWS:** Use CloudFormation or the AWS Console to create:
	 - S3 buckets for receipts/docs
	 - Cognito User Pool
	 - Lambda functions for OCR & expense processing
	 - DynamoDB tables
	 - API Gateway endpoints
	 - SNS topics for alerts
	 - QuickSight dashboards
	 - CloudFront distribution
5. **Configure your app:** Add your AWS resource ARNs, endpoints, and keys to `src/environments/environment.prod.ts`.

---

## 🧩 Example: Uploading a Receipt to S3

Here’s a quick peek at how you might upload a receipt from Angular:

```typescript
// src/app/services/aws-s3.service.ts
import { Injectable } from '@angular/core';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable({ providedIn: 'root' })
export class AwsS3Service {
	private s3 = new S3Client({ region: 'YOUR_REGION', credentials: {/* ... */} });

	async uploadReceipt(file: File, userId: string) {
		const params = {
			Bucket: 'YOUR_RECEIPT_BUCKET',
			Key: `${userId}/${file.name}`,
			Body: file,
			ContentType: file.type,
		};
		return await this.s3.send(new PutObjectCommand(params));
	}
}
```

---

## 🔒 Security First

- Your data is locked down with Cognito authentication.
- S3 buckets are private—access only via signed URLs.
- API Gateway endpoints are protected with Cognito authorizers.

---

## 💡 Pro Tips & Troubleshooting

- Double-check your AWS credentials and ARNs in the environment files.
- CORS issues? Update your API Gateway and S3 bucket policies.
- Build errors? Run `npm install` to make sure all dependencies are there.
- Authentication not working? Verify your Cognito User Pool and client IDs.

---

## 🖥️ User Experience

- **Dashboard:** See your total expenses, budgets, and alerts at a glance.
- **Receipt Upload:** Snap, scan, and categorize instantly.
- **Expense List:** Filter and organize your spending.
- **Budget Settings:** Set, adjust, and track monthly budgets.
- **Reports:** Interactive charts powered by QuickSight.
- **Authentication:** Simple, secure login/signup.

---

## 📚 Useful AWS Links

- [Amazon S3](https://docs.aws.amazon.com/s3/index.html)
- [AWS Lambda](https://docs.aws.amazon.com/lambda/index.html)
- [Amazon Textract](https://docs.aws.amazon.com/textract/index.html)
- [Amazon DynamoDB](https://docs.aws.amazon.com/dynamodb/index.html)
- [Amazon Cognito](https://docs.aws.amazon.com/cognito/index.html)
- [Amazon SNS](https://docs.aws.amazon.com/sns/index.html)
- [Amazon QuickSight](https://docs.aws.amazon.com/quicksight/index.html)
- [Amazon CloudFront](https://docs.aws.amazon.com/cloudfront/index.html)

---

## 🧑‍💻 Want to Contribute?

We love new ideas! Here’s how to get involved:
1. Fork the repo and create your feature branch (`git checkout -b feature/your-feature`)
2. Commit your changes (`git commit -am 'Add new feature'`)
3. Push to your branch (`git push origin feature/your-feature`)
4. Open a pull request and tell us what you built!

---

## 🙋 Need Help?

Open an issue or reach out at [your-email@example.com]. We’re here to help!

---

## 📝 License

MIT — use it, share it, build something awesome!

## User Stories
- As a user, I want to scan receipts and have expenses automatically categorized.
- As a user, I want to set monthly budgets and receive alerts when I exceed them.
- As a user, I want to view visual reports of my spending habits.
- As a user, I want my data to be secure and accessible from anywhere.

## UI Overview
- **Dashboard:** View total expenses, budgets, and alerts.
- **Receipt Upload:** Scan and upload receipts (uses AWS Textract).
- **Expense List:** Browse, filter, and categorize expenses.
- **Budget Settings:** Set and adjust monthly budgets.
- **Reports:** Interactive charts powered by Amazon QuickSight.
- **Authentication:** Secure login/signup via Cognito.

## AWS Resource Links
- [Amazon S3 Documentation](https://docs.aws.amazon.com/s3/index.html)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/index.html)
- [Amazon Textract Documentation](https://docs.aws.amazon.com/textract/index.html)
- [Amazon DynamoDB Documentation](https://docs.aws.amazon.com/dynamodb/index.html)
- [Amazon Cognito Documentation](https://docs.aws.amazon.com/cognito/index.html)
- [Amazon SNS Documentation](https://docs.aws.amazon.com/sns/index.html)
- [Amazon QuickSight Documentation](https://docs.aws.amazon.com/quicksight/index.html)
- [Amazon CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/index.html)

## Troubleshooting
- Ensure all AWS credentials and resource ARNs are correctly set in environment files.
- If you encounter CORS issues, update your API Gateway and S3 bucket policies.
- For build errors, run `npm install` to ensure all dependencies are installed.
- For authentication issues, verify Cognito User Pool configuration and client IDs.

## Contribution Guidelines
1. Fork the repository and create your feature branch (`git checkout -b feature/your-feature`)
2. Commit your changes (`git commit -am 'Add new feature'`)
3. Push to the branch (`git push origin feature/your-feature`)
4. Open a pull request

## Contact
For questions or support, open an issue or contact the maintainer at [your-email@example.com].

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
