import { makeAutoObservable, runInAction } from 'mobx';
import StateStore from './StateStores/StateStore';
import FetchingStateStore from './StateStores/FetchingStateStore';
import { AuthServices } from '../services/Auth/AuthServices';
import SuccessStateStore from './StateStores/SuccessStateStore';
import ErrorStateStore from './StateStores/ErrorStateStore';
import { UserResponse } from '../types/UserType';
import { getToken } from '../services/ApiConnection';
import { ProfileServices } from '../services/ProfileServices';

class UserStore {
  user?: UserResponse;

  state?: StateStore;

  token?: string;

  refreshToken?: string;

  constructor() {
    makeAutoObservable(this);
    this.token = getToken();
    this.refreshToken = localStorage.getItem('riseUpRefreshToken') ?? undefined;
  }

  public async getUserData() {
    this.state = new FetchingStateStore();
    try {
      const response = await ProfileServices.GetUserProfile();
      if (response) {
        runInAction(() => {
          this.user = response;
          this.state = new SuccessStateStore();
        });
      }
    } catch (error) {
      runInAction(() => {
        this.state = new ErrorStateStore(error);
      });
    }
  }

  public async UpdateToken() {
    this.state = new FetchingStateStore();
    try {
      if (this.refreshToken) {
        const response = await AuthServices.RefreshToken(this.refreshToken);
        if (response) {
          runInAction(() => {
            localStorage.setItem('riseUpToken', response.access);
            runInAction(() => {
              this.token = response.access;
              this.state = new SuccessStateStore();
            });
          });
        }
      }
    } catch (error) {
      runInAction(() => {
        this.state = new ErrorStateStore(error);
      });
    }
  }

  public async Login(username: string, password: string) {
    this.state = new FetchingStateStore();
    try {
      const response = await AuthServices.GetTokens(username, password);
      if (response) {
        localStorage.setItem('riseUpToken', response.access);
        localStorage.setItem('riseUpRefreshToken', response.refresh);
        this.token = response.access;
        this.refreshToken = response.refresh;
        if (await AuthServices.VerifyToken(this.token)) {
          runInAction(() => {
            this.state = new SuccessStateStore();
          });
        }
      }
    } catch (error) {
      runInAction(() => {
        this.state = new ErrorStateStore(error);
      });
    }
  }

  public async UpdateUserData(user: UserResponse) {
    this.state = new FetchingStateStore();
    try {
      const response = await ProfileServices.UpdateUserProfile(user);
      if (response) {
        runInAction(() => {
          this.user = response;
          this.state = new SuccessStateStore();
        });
      }
    } catch (error) {
      runInAction(() => {
        this.state = new ErrorStateStore(error);
      });
    }
  }
}

export default UserStore;
