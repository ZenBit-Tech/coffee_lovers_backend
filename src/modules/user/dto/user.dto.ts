import { ApiProperty } from '@nestjs/swagger';
import { EnglishLevel, Role, AvailableTime } from '@constants/entities';
import { Skill } from '@entities/Skill.entity';
import { Category } from '@entities/Category.entity';

export default class UserDto {
  @ApiProperty({ example: 123 })
  id: number;

  @ApiProperty({ example: 'test@test.com' })
  email: string;

  @ApiProperty({ example: 'John' })
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  last_name: string;

  @ApiProperty({ example: 'https://localhost:4200/image.img' })
  profile_image: string;

  @ApiProperty({ example: 'Freelancer' })
  role: Role;

  @ApiProperty({ example: 'Full-Time' })
  available_time: AvailableTime;

  @ApiProperty({ example: 'Front-end developer' })
  description: string;

  @ApiProperty({ example: 'Front-end developer' })
  position: string;

  @ApiProperty({ example: 30 })
  hourly_rate: number;

  @ApiProperty({ example: 'English teacher' })
  other_experience: string;

  @ApiProperty({ example: EnglishLevel.UPPER_INTERMEDIATE })
  english_level: EnglishLevel;

  @ApiProperty({ example: { id: 1, name: 'Front-end development' } })
  category: Category;

  @ApiProperty({ example: [{ id: 1, name: 'HTML' }] })
  skills: Skill[];
}
