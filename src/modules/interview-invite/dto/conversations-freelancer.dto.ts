import { Conversation } from '@/common/entities/Conversation.entity';
import { User } from '@/common/entities/User.entity';

export interface ConversResponse {
  data: Conversation[];
  freelancer: User;
}
