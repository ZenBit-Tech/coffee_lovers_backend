import SignInDto from '@/modules/auth/dto/signIn.dto';
import CreateUserDto from '@/modules/user/dto/create-user.dto';

export const createUserDto: CreateUserDto = {
  email: 'test@test.com',
  password: 'Qwerty123',
  first_name: 'John',
  last_name: 'Doe',
};

export const signInDto: SignInDto = {
  email: 'test@test.com',
  password: 'Qwerty123',
};
