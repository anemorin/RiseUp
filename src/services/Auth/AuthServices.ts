import { ApiConnection } from '../ApiConnection';

export class AuthServices {
  // public static async Login(login: string, password: string) {
  //   const response = await ApiConnection.post<token>('login', { username: login, password });
  //   return response.data;
  // }

  // public static async GetUserProfile() {
  //   const response = await ApiConnection.get<UserResponse>('userprofile/');
  //   return response.data;
  // }

  // public static async Registration(username: string, email: string, password: string) {
  //   const response = await ApiConnection.post<token>('register/', { username, email, password });
  //   return response.data;
  // }

  public static async GetTokens(username: string, password: string) {
    const response = await ApiConnection.post<{access: string, refresh: string}>('token', {
      username,
      password,
    });
    return response.data;
  }

  public static async RefreshToken(refresh: string) {
    const response = await ApiConnection.post<{access: string}>('token/refresh', { refresh });
    return response.data;
  }

  public static async VerifyToken(token: string) {
    const response = await ApiConnection.post('token/verify', { token });
    return response.status === 200;
  }
}
