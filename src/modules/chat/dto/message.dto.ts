import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber } from 'class-validator';
import UserDto from '@/modules/user/dto/user.dto';
import { CreateMessageDto } from './create-message.dto';

export class MessageDto extends CreateMessageDto {
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

  @ApiProperty({ example: '2022-11-27T14:44:05.241Z' })
  @IsDateString()
  created_at: Date;
}
