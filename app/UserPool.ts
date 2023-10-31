import { CognitoUserPool, ICognitoUserPoolData } from "amazon-cognito-identity-js";

const poolData: ICognitoUserPoolData = {
    UserPoolId:'us-east-1_VjgPyBrVn',
    ClientId: '4u3i4f4o6ilavm8b03i83lqss3'
};

const UserPool = new CognitoUserPool(poolData);

export default UserPool;