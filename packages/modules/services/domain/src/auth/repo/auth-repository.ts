import Auth from '../entities/auth';

interface AuthRepository {
  login: (username: string, password: string) => Promise<Auth>;
}

export default AuthRepository;
