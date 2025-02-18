import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import { User } from "../../domain/User";

const poolData = {
  UserPoolId: process.env.COGNITO_USER_POOL_ID!,
  ClientId: process.env.COGNITO_CLIENT_ID!,
};

const userPool = new CognitoUserPool(poolData);

export class CognitoAdapter {
  static async registerUser(user: User): Promise<void> {
    return new Promise((resolve, reject) => {
      const attributeList = [
        new CognitoUserAttribute({ Name: "email", Value: user.email }),
      ];

      userPool.signUp(
        user.username,
        user.getPassword(),
        attributeList,
        [],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  static async authenticateUser(
    username: string,
    password: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const authDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
      });

      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool,
      });

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (session) => {
          resolve(session.getIdToken().getJwtToken());
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
}
