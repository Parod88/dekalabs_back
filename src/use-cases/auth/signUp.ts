import { AuthService } from "../../services/authService";
export const registerUser = async (
  username: string,
  password: string,
  email: string
) => {
  return await AuthService.register(username, password, email);
};
