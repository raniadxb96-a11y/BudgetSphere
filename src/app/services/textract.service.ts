import { Injectable } from '@angular/core';
import { TextractClient, AnalyzeDocumentCommand } from '@aws-sdk/client-textract';

@Injectable({ providedIn: 'root' })
export class TextractService {
  private client = new TextractClient({ region: 'YOUR_REGION', credentials: {/* ... */} });

  async analyzeReceipt(documentBytes: Uint8Array) {
    const params = {
      Document: { Bytes: documentBytes },
      FeatureTypes: ['FORMS'],
    };
    return await this.client.send(new AnalyzeDocumentCommand(params));
  }
}
