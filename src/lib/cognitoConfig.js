import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: 'us-east-2_WWrLdmDvJ',
    ClientId: '3nhmnd8t8145dfc9hbd3tq83v6'
};

export const userPool = new CognitoUserPool(poolData);