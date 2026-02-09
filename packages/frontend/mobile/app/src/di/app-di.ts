import {
  loginUsecase,
  DefaultAuthRepository,
  DefaultAuthRemote,
  DefaultAuthCredentialStore,
  SplashDI,
} from '@features/auth';

export default class AppDI implements SplashDI {
  loginUsecase() {
    const authRemote = new DefaultAuthRemote();
    const authCredentialStore = new DefaultAuthCredentialStore();
    const authRepository = new DefaultAuthRepository(
      authRemote,
      authCredentialStore,
    );
    return loginUsecase(authRepository);
  }
}
