import { Injectable } from '@angular/core';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

@Injectable({ providedIn: 'root' })
export class SnsAlertService {
  private client = new SNSClient({ region: 'YOUR_REGION', credentials: {/* ... */} });

  async sendBudgetAlert(topicArn: string, message: string) {
    const params = {
      TopicArn: topicArn,
      Message: message,
    };
    return await this.client.send(new PublishCommand(params));
  }
}
