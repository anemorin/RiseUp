import { createContext } from 'react';
import UserStore from '../stores/UserStore';
import WorkoutStore from '../stores/WorkoutStore';

export const storeContext = createContext({
  userStore: new UserStore(),
  workoutStore: new WorkoutStore(),
});
