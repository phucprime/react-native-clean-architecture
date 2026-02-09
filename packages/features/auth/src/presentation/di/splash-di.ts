import { LoginUsecase } from '../viewmodels/splash-viewmodel';

interface SplashDI {
  loginUsecase(): LoginUsecase;
}

export default SplashDI;
