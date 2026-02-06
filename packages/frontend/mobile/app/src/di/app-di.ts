import { loginUsecase } from '@services/domain';
import { DefaultAuthRepository } from '@services/platform';
import { DefaultAuthRemote } from '@services/remote';
import { DefaultAuthCredentialStore } from '@services/store';
import { SplashDI } from '@mobile/ui';

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
