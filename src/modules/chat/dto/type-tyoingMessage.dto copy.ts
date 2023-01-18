import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber } from 'class-validator';
import UserDto from '@/modules/user/dto/user.dto';
import { TypeMessageDto } from './type-message.dto';

export class TypingMessageDto extends TypeMessageDto {
  @ApiProperty({
    example: {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      profile_image: 'img/1cc83981-e672-4a63-8ff9-eb6ea8aaba03.jpg',
    },
  })
  @IsNumber()
  from: UserDto;
}
