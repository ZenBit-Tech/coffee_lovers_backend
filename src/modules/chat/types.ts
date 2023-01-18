import { User } from '@entities/User.entity';
import UserDto from '@/modules/user/dto/user.dto';

export interface UserHandshake {
  user: User;
}
