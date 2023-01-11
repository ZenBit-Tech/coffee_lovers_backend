import { Conversation } from '../entities/Conversation.entity';
import { mockJobOfTypeJob } from './jobs';
import { mockFreelancerOfTypeUser, mockJobOwnerOfTypeUser } from './users';

export const mockConversation: Conversation = {
  id: 0,
  job: mockJobOfTypeJob,
  freelancer: mockFreelancerOfTypeUser,
  job_owner: mockJobOwnerOfTypeUser,
  messages: [],
};
