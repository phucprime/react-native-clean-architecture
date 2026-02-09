import { getAppNavigation } from './../navigation';
import { SplashFlow, SplashFlowFactory } from '@features/auth';

class AppFlow implements SplashFlowFactory {
  protected readonly navigation = getAppNavigation();

  splashFlow = (): SplashFlow => ({
    toAuth: (): void => {
      console.warn('AppFlow.SplashFlow toAuth() is not implemented');
    },
  });
}

export default AppFlow;
