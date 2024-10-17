import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: 'us-east-2_3z5nTvGeB',
    ClientId: '52j6m45mf20v8jl7c4gbr7fqfc'
};

export const userPool = new CognitoUserPool(poolData);