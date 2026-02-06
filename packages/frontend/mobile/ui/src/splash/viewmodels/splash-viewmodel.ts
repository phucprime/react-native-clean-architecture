import { action, makeObservable, observable } from 'mobx';
import { Auth } from '@services/domain';

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

  login() {
    this.loginUsecase('Username', 'password');
    this.count++;
  }
}

export default SplashViewModel;
