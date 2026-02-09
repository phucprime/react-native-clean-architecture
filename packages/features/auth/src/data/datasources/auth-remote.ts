import AuthDto from '../dto/auth-dto';

interface AuthRemote {
  login: (username: string, password: string) => Promise<AuthDto>;
}

export default AuthRemote;
