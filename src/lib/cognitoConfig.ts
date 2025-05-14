import { CognitoUserPool } from 'amazon-cognito-identity-js';

export const poolData = {
    UserPoolId: 'us-east-1_SbBWuTzyW',
    ClientId: '2mh12kgapdv9kodpkrner1oppi',
};

export const userPool = new CognitoUserPool(poolData);
