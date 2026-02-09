import Auth from '../entities/auth';

export interface AuthRepository {
  login: (username: string, password: string) => Promise<Auth>;
}

const loginUsecase =
  (authRepository: AuthRepository) =>
  async (username: string, password: string): Promise<Auth> => {
    if (!username || !password) {
      throw new Error('Username and password are required');
    }
    return authRepository.login(username, password);
  };

export default loginUsecase;
