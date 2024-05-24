import { DayType } from '../types/DayType';
import { ExercisesType } from '../types/ExercisesType';
import { WorkoutsType } from '../types/WorkoutType';
import { ApiConnection } from './ApiConnection';

export class WorkoutServices {
  public static async GetDay() {
    const response = await ApiConnection.get<DayType>('day/');
    return response.data;
  }

  public static async GetWorkouts(id: number) {
    const workoutResponse = await ApiConnection.get<WorkoutsType>(`set/?exerciseday=${id}`);
    const response = workoutResponse.data.results.map(async (workout) => {
      ret(
      await ApiConnection.get<ExercisesType>(`setting/?set=${workout.id}`)
    ).data.results[0].exercise_base);}
    console.warn(response);
    // return response.data;
  }

  // public static async UpdateUserProfile(user: UserResponse) {
  //   const response = await ApiConnection.post<UserResponse>('userprofile/', {
  //     ...user,
  //   });
  //   return response.data;
  // }
}
