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
