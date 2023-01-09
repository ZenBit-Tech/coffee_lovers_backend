import { OfferStatus, RequestType } from '@/common/constants/entities';
import { User } from '@/common/entities/User.entity';

export const UserMock: User = {
  id: 5,
  email: 'kasirecIvanna@dd.com',
  password: 'password',
  first_name: 'Ivanna',
  last_name: 'Kashyrets',
  profile_image: 'url',
  is_google: false,
  available_time: null,
  description: 'Hello world',
  hourly_rate: 20,
  position: 'Full-stack developer',
  other_experience: null,
  english_level: null,
  role: null,
  workHistory: null,
  educations: null,
  jobs: null,
  skills: null,
  category: null,
  reset_password_key: null,
  conversations: null,
  messages: null,
  requests: null,
  notifications: null,
  offers: null,
  favorites: [],
};

export const SendOfferMock = {
  hourly_rate: 20,
  status: 'Accepted',
};

export const PostRequestMock = {
  type: RequestType.PROPOSAL,
  hourly_rate: 15,
  reject: false,
  cover_letter: 'Your cover letter with skills description',
};
