import jwt from "jsonwebtoken";

export class JwtAdapter {
  static generateToken(username: string) {
    return jwt.sign({ username }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
  }
}
