import { ApiProperty } from '@nestjs/swagger';
import { ContractStatus } from '@/common/constants/entities';
import OfferBody from '@/modules/requests/dto/offer-body-dto';
import UserDto from '@/modules/user/dto/user.dto';

export default class ContractsResponseDto {
  @ApiProperty({ example: 3 })
  id: number;

  @ApiProperty({ example: 'Closed' })
  status: ContractStatus;

  @ApiProperty({ example: '2022-11-27T14:44:05.241Z' })
  created_at: Date;

  @ApiProperty({ example: '2022-11-27T14:44:05.241Z' })
  end: Date;

  @ApiProperty({
    example: {
      id: 60,
      hourly_rate: 15,
      status: 'Declined',
      start: '2022-12-22T17:23:02.956Z',
      created_at: '2022-12-24T10:52:34.000Z',
      job: {
        id: 4566393,
        title: 'landing',
        description: 'job descr',
        hourly_rate: 20,
        available_time: 'Full-Time',
        english_level: 'Upper-Intermediate',
        duration: null,
        duration_amount: null,
        status: 'Pending',
        created_at: null,
      },
    },
  })
  offer: OfferBody;

  @ApiProperty({
    example: {
      id: 5,
      email: 'kasircivanna@gmail.com',
      first_name: 'Ivanna',
      last_name: 'Kashyrets',
      profile_image: 'http://localhost:4200/index.jpg',
      available_time: null,
      description:
        'Вочевидь, зараз не всі пригадають цю серпневу дату – вісімнадцяте святкування Дня Незалежності України. Відлік десятилітньої історії Вишиванкового фестивалю розпочався саме тоді, коли сімдесят дев’ять людей, убраних у виши́ванки, утворили вздовж Потьомкін',
      hourly_rate: 20,
      position: 'Full-stack developer',
      other_experience: null,
      english_level: 'Pre-Intermediate',
      role: 'Freelancer',
    },
  })
  freelancer: UserDto;
}
