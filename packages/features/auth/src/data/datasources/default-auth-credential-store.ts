import AuthCredentialStore from './auth-credential-store';

class DefaultAuthCredentialStore implements AuthCredentialStore {
  storeToken(authToken: string): void {
    console.log(`saved ${authToken}`);
  }
}

export default DefaultAuthCredentialStore;
