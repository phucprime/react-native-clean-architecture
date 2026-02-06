import { Auth, AuthRepository } from '@services/domain';
import AuthRemote from '../contract/remote/auth-remote';
import AuthCredentialStore from '../contract/store/auth-credential-store';
import authMapper from '../mappers/auth-mapper';

class DefaultAuthRepository implements AuthRepository {
  authRemote: AuthRemote;
  authCredentialStore: AuthCredentialStore;

  constructor(
    authRemote: AuthRemote,
    authCredentialStore: AuthCredentialStore,
  ) {
    this.authRemote = authRemote;
    this.authCredentialStore = authCredentialStore;
  }

  async login(username: string, password: string): Promise<Auth> {
    const dto = await this.authRemote.login(username, password);
    this.authCredentialStore.storeToken(dto.access_token);
    return authMapper.toDomain(dto);
  }
}

export default DefaultAuthRepository;
