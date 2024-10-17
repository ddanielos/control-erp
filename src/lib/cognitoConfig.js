import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: 'us-east-2_XXQCdX6gu',
    ClientId: 'ponivnjrvdke929huon9rgf2c'
};

export const userPool = new CognitoUserPool(poolData);