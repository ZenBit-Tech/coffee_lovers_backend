import { AvailableTime, EnglishLevel, Role } from '@constants/entities';
import { User } from '@/common/entities/User.entity';
import AuthGoogleResponseDto from '@/modules/auth/dto/auth-google-response.dto';
import AddUserEducationDto from '@/modules/user/dto/add-user-education.dto';
import AddUserWorkhistoryDto from '@/modules/user/dto/add-user-workhistory.dto';
import SetFavoritesDto from '@/modules/user/dto/set-favorites.dto';
import SetFreelancerRatingDto from '@/modules/user/dto/set-freelancer-rating.dto';
import UpdateUserDto from '@/modules/user/dto/update-user.dto';

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
  average_rating: 4.3,
  reviews_amount: 10,
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
  jobOwnerRating: [],
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
  reviews_amount: 10,
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
  jobOwnerRating: [],
};

export const mockAddUserEducationDto: AddUserEducationDto = {
  education_descr: 'description',
  education_from: '2012',
  education_to: '2014',
};

export const mockAddUserWorkhistoryDto: AddUserWorkhistoryDto = {
  work_history_descr: 'description',
  work_history_from: '2012',
  work_history_to: '2014',
};

export const mockSetFavoritesDto: SetFavoritesDto = {
  id: 1,
  is_favorite: false,
};

export const mockSetFreelancerRatingDto: SetFreelancerRatingDto = {
  freelancer_id: 1,
  rating: 5,
  rating_comment: 'very good freelancer',
  job_id: 10,
};

export const mockUpdateUserDto: UpdateUserDto = {
  ...mockJobOwnerOfTypeUser,
  password: 'Qwerty123',
};

export const mockGetFavoritesDto = {
  totalCount: 12,
  favorites: [{ ...mockUpdateUserDto }],
};

export const getFavoritesParams = { page: 1, take: 10, skip: 0 };

export const mockGetFreelancerRatingDto = {
  freelancer: { ...mockJobOwnerOfTypeUser },
  created_at: '2023-01-18 18:32:36.133287',
  job_owner: { ...mockJobOwnerOfTypeUser },
};

export const mockResp = {
  freelancerById: 'user 5',
};
