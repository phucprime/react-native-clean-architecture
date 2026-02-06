import { AuthRemote, AuthDto } from '@services/platform';

class DefaultAuthRemote implements AuthRemote {
  async login(username: string, password: string): Promise<AuthDto> {
    console.log(`Auth login: ${username}: ${password}`);
    return { access_token: 'authtoken' };
  }
}

export default DefaultAuthRemote;
