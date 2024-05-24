import { makeAutoObservable } from 'mobx';
import { DayType } from '../types/DayType';
import StateBaseStore from './StateStores/StateStore';
import FetchingStateStore from './StateStores/FetchingStateStore';
import { WorkoutServices } from '../services/WorkoutServices';
import SuccessStateStore from './StateStores/SuccessStateStore';
import ErrorStateStore from './StateStores/ErrorStateStore';
import { WorkoutsType } from '../types/WorkoutType';

class WorkoutStore {
  day?: DayType;

  workouts?: WorkoutsType;

  state: StateBaseStore;

  constructor() {
    this.day = undefined;
    this.state = new StateBaseStore();
    makeAutoObservable(this);
  }

  public async getDay() {
    this.state = new FetchingStateStore();
    try {
      const response = await WorkoutServices.GetDay();
      if (response) {
        this.day = response;
        this.state = new SuccessStateStore();
      }
    } catch (error) {
      this.state = new ErrorStateStore(error);
    }
  }

  public async getWorkouts(id: number) {
    this.state = new FetchingStateStore();
    try {
      const response = await WorkoutServices.GetWorkouts(id);
      if (response) {
        this.workouts = response;
        this.state = new SuccessStateStore();
      }
    } catch (error) {
      this.state = new ErrorStateStore(error);
    }
  }

  // public async getWorkoutInfo()
}

export default WorkoutStore;
