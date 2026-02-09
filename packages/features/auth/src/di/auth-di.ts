import { loginUsecase } from '../domain';
import { DefaultAuthRepository } from '../data/repositories';
import { DefaultAuthRemote } from '../data/datasources';
import { DefaultAuthCredentialStore } from '../data/datasources';
import { LoginUsecase } from '../presentation/viewmodels/splash-viewmodel';

export interface AuthDI {
  loginUsecase(): LoginUsecase;
}

export function createAuthDI(): AuthDI {
  return {
    loginUsecase() {
      const authRemote = new DefaultAuthRemote();
      const authCredentialStore = new DefaultAuthCredentialStore();
      const authRepository = new DefaultAuthRepository(
        authRemote,
        authCredentialStore,
      );
      return loginUsecase(authRepository);
    },
  };
}
