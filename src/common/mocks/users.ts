import { AvailableTime, EnglishLevel } from '@constants/entities';

export const mockJobOwner1 = {
  id: 1,
  email: 'johndoe@test.com',
  first_name: 'John',
  last_name: 'Doe',
  profile_image: 'img/660ba6e4-557b-4033-8e79-656ea305f342.jpg',
};

export const mockFreelancer1 = {
  id: 2,
  email: 'adampowers@test.com',
  first_name: 'Adam',
  last_name: 'Powers',
  profile_image: 'img/63a1fd5c-a9f9-40a0-88bf-5e9620e016e1.jpg',
  available_time: AvailableTime.FULL_TIME,
  position: 'Full-Stack Developer',
  english_level: EnglishLevel.INTERMEDIATE,
};
