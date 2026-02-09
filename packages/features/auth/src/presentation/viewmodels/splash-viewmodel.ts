import { action, makeObservable, observable, runInAction } from 'mobx';
import { Auth } from '../../domain';

export interface SplashViewFlow {
  toAuth(): void;
}

export type LoginUsecase = (
  username: string,
  password: string,
) => Promise<Auth>;

class SplashViewModel {
  loginUsecase: LoginUsecase;
  splashViewFlow: SplashViewFlow;

  title: string = 'Hello from React Native';
  count: number = 0;

  constructor(loginUsecase: LoginUsecase, splashViewFlow: SplashViewFlow) {
    this.loginUsecase = loginUsecase;
    this.splashViewFlow = splashViewFlow;

    makeObservable(this, {
      title: observable,
      count: observable,
      login: action,
    });
  }

  async login() {
    try {
      await this.loginUsecase('Username', 'password');
      runInAction(() => {
        this.count++;
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  }
}

export default SplashViewModel;
