import { CognitoUserPool } from 'amazon-cognito-identity-js';

export const poolData = {
    UserPoolId: 'us-east-1_g2JyE6T6a',
    ClientId: 'k3896ujiu6r8lglufs1d2fht6',
};

export const userPool = new CognitoUserPool(poolData);
