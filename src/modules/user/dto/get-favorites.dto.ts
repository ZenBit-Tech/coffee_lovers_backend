import { IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Favorites } from '@entities/Favorites.entity';

export default class GetFavoritesDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  totalCount: number;

  @ApiProperty({
    example: {
      id: 8,
      email: 'pcherny10@students.lcc.lt',
      first_name: 'Pavlo',
      last_name: 'Chernykh',
      profile_image: 'img/1d1fb659-04ca-4b25-8a79-1ec6152081ac.jpg',
      available_time: 'Full-Time',
      description: "I'm super cool man",
      hourly_rate: 12,
      position: 'Front-end developer',
      other_experience: 'Supa cool mand',
      english_level: 'No English',
      role: 'Freelancer',
      category: {
        id: 10,
        name: 'Android',
      },
    },
  })
  @IsArray()
  favorites: Favorites[];
}
