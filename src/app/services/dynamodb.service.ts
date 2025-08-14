import { Injectable } from '@angular/core';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

@Injectable({ providedIn: 'root' })
export class DynamoDbService {
  private client = new DynamoDBClient({ region: 'YOUR_REGION', credentials: {/* ... */} });

  async addExpense(userId: string, amount: number, category: string, date: string) {
    const params = {
      TableName: 'YOUR_EXPENSE_TABLE',
      Item: {
        userId: { S: userId },
        amount: { N: amount.toString() },
        category: { S: category },
        date: { S: date },
      },
    };
    return await this.client.send(new PutItemCommand(params));
  }
}
