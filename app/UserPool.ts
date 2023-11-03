import { CognitoUserPool, ICognitoUserPoolData } from "amazon-cognito-identity-js";

const poolData: ICognitoUserPoolData = {
    UserPoolId:process.env.NEXT_PUBLIC_USERPOOL_ID as string,
    ClientId: process.env.NEXT_PUBLIC_CLIENT_ID as string
};

const UserPool = new CognitoUserPool(poolData);

export default UserPool;