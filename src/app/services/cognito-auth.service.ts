import { Injectable } from '@angular/core';
import { CognitoIdentityProviderClient, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';

@Injectable({ providedIn: 'root' })
export class CognitoAuthService {
  private client = new CognitoIdentityProviderClient({ region: 'YOUR_REGION' });

  async signIn(username: string, password: string) {
    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: 'YOUR_COGNITO_CLIENT_ID',
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    };
    return await this.client.send(new InitiateAuthCommand(params));
  }
}
