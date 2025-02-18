import { MockCognitoAdapter as CognitoAdapter } from "../mocks/MockCognitoAdapter";
import { JwtAdapter } from "../infrastructure/adapters/JwtAdapter";
import { User } from "../domain/User";

export class AuthService {
  static async register(username: string, password: string, email: string) {
    const newUser = new User({ username, password, email });
    await CognitoAdapter.registerUser(
      newUser.username,
      newUser.getPassword(),
      newUser.email
    );
    return { message: "Usuario registrado exitosamente" };
  }

  static async login(username: string, password: string) {
    try {
      const cognitoToken = await CognitoAdapter.authenticateUser(
        username,
        password
      );
      const customToken = JwtAdapter.generateToken(username);
      return { cognitoToken, customToken };
    } catch (error: any) {
      throw new Error("Error de autenticación: " + error.message);
    }
  }
}
