import { User } from '@entities/User.entity';
import { Role, AvailableTime, EnglishLevel } from '@constants/entities';
import AddUserEducationDto from '@/modules/user/dto/add-user-education.dto';
import AddUserWorkhistoryDto from '@/modules/user/dto/add-user-workhistory.dto';

export const educationPayload: AddUserEducationDto[] = [
  {
    education_descr: 'I studied computer sciency at MIT',
    education_from: '2010',
    education_to: '2015',
  },
];

export const workhistoryPayload: AddUserWorkhistoryDto[] = [
  {
    work_history_descr: 'Worked at Google, PERN stack',
    work_history_from: '2020',
    work_history_to: '2022',
  },
];

export const fullFreelancerMockData = {
  id: 123,
  email: 'test@test.com',
  first_name: 'John',
  last_name: 'Doe',
  profile_image: 'https://localhost:4200/image.img',
  role: Role.FREELANCER,
  available_time: AvailableTime.FULL_TIME,
  description: 'Front-end developer',
  position: 'Front-end developer',
  hourly_rate: 30,
  other_experience: 'English teacher',
  english_level: EnglishLevel.UPPER_INTERMEDIATE,
  category: {
    id: 1,
    name: 'Front-end development',
  },
  skills: [
    {
      id: 1,
      name: 'HTML',
    },
  ],
} as User;
