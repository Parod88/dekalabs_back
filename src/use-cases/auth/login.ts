import { AuthService } from "../../services/authService";
export const loginUser = async (username: string, password: string) => {
  return await AuthService.login(username, password);
};
