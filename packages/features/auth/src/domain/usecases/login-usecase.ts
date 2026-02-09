import Auth from '../entities/auth';
import AuthRepository from '../repositories/auth-repository';

const loginUsecase =
  (authRepository: AuthRepository) =>
  async (username: string, password: string): Promise<Auth> => {
    if (!username || !password) {
      throw new Error('Username and password are required');
    }
    return authRepository.login(username, password);
  };

export default loginUsecase;
