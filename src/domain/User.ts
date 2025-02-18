export class User {
  readonly username: string;
  private password: string;
  readonly email: string;

  constructor({
    username,
    password,
    email,
  }: {
    username: string;
    password: string;
    email: string;
  }) {
    if (!username || !email || !password) {
      throw new Error("Todos los campos son obligatorios");
    }

    if (password.length < 6) {
      throw new Error("La contraseña debe tener al menos 6 caracteres");
    }

    this.username = username;
    this.password = password;
    this.email = email;
  }

  getPassword(): string {
    return this.password;
  }
}
