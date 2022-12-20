import { Conversation } from '@/common/entities/Conversation.entity';
import { Request } from '@/common/entities/Request.entity';
import { User } from '@/common/entities/User.entity';

export interface RequestResponse {
  data: Request[];
  freelancer: User;
}

export interface ConversResponse {
  data: Conversation[];
  freelancer: User;
}
