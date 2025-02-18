export class MockCognitoAdapter {
  private static users = new Map<string, { password: string; email: string }>();

  static async registerUser(username: string, password: string, email: string) {
    if (this.users.has(username)) {
      throw new Error("El usuario ya existe");
    }
    this.users.set(username, { password, email });
    return { message: "Usuario registrado exitosamente (Mock)" };
  }

  static async authenticateUser(username: string, password: string) {
    const user = this.users.get(username);
    if (!user || user.password !== password) {
      throw new Error("Credenciales incorrectas");
    }
    return `mock-token-for-${username}`;
  }
}
