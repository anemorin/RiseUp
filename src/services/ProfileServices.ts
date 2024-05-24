import { UserResponse } from '../types/UserType';
import { ApiConnection } from './ApiConnection';

export class ProfileServices {
  public static async GetUserProfile() {
    const response = await ApiConnection.get<UserResponse>('userprofile/');
    return response.data;
  }

  public static async UpdateUserProfile(user: UserResponse) {
    const response = await ApiConnection.post<UserResponse>('userprofile/', {
      ...user,
    });
    return response.data;
  }
}
