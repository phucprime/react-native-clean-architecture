import { Auth } from '../../domain';
import AuthDto from '../dto/auth-dto';

const authMapper = {
  toDomain(dto: AuthDto): Auth {
    return {
      accessToken: dto.access_token,
    };
  },
};

export default authMapper;
