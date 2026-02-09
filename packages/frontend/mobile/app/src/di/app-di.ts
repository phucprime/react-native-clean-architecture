import {
  createAuthDI,
  SplashDI,
} from '@features/auth';

export default class AppDI implements SplashDI {
  private readonly authDI = createAuthDI();

  loginUsecase() {
    return this.authDI.loginUsecase();
  }
}
