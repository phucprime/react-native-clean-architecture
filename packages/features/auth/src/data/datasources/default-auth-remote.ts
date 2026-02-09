import { AuthDto } from '../dto';
import AuthRemote from './auth-remote';

class DefaultAuthRemote implements AuthRemote {
  async login(username: string, password: string): Promise<AuthDto> {
    console.log(`Auth login: ${username}: ${password}`);
    return { access_token: 'authtoken' };
  }
}

export default DefaultAuthRemote;
