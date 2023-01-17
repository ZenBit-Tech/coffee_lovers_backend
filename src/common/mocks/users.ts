import { AvailableTime, EnglishLevel, Role } from '@constants/entities';
import { User } from '@/common/entities/User.entity';
import AuthGoogleResponseDto from '@/modules/auth/dto/auth-google-response.dto';

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

export const mockCredential: AuthGoogleResponseDto = {
  access_token: 'my_access_token',
  role: false,
};

export const mockJobOwnerOfTypeUser: User = {
  id: 1,
  email: 'johndoe@test.com',
  first_name: 'John',
  last_name: 'Doe',
  profile_image: 'img/660ba6e4-557b-4033-8e79-656ea305f342.jpg',
  role: Role.FREELANCER,
  available_time: AvailableTime.FULL_TIME,
  description: 'User description',
  position: 'Full stack developer',
  hourly_rate: 50,
  other_experience: '',
  english_level: EnglishLevel.NO_ENGLISH,
  skills: [],
  category: null,
  password: '',
  is_google: false,
  average_rating: 5,
  reset_password_key: '',
  workHistory: [],
  educations: [],
  jobs: [],
  conversations: [],
  messages: [],
  requests: [],
  notifications: [],
  offers: [],
  favorites: [],
  freelancerRating: [],
};

export const mockFreelancerOfTypeUser: User = {
  id: 1,
  email: 'annndoe@test.com',
  first_name: 'Ann',
  last_name: 'Doe',
  profile_image: 'img/660ba6e4-557b-4033-8e79-656ea305f342.jpg',
  role: Role.FREELANCER,
  available_time: AvailableTime.FULL_TIME,
  description: 'User description',
  position: 'Full stack developer',
  hourly_rate: 50,
  average_rating: 5,
  other_experience: '',
  english_level: EnglishLevel.NO_ENGLISH,
  skills: [],
  category: null,
  password: '',
  is_google: false,
  reset_password_key: '',
  workHistory: [],
  educations: [],
  jobs: [],
  conversations: [],
  messages: [],
  requests: [],
  notifications: [],
  offers: [],
  favorites: [],
  freelancerRating: [],
};
