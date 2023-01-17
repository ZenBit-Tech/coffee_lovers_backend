import { Job } from '@entities/Job.entity';
import { User } from '@entities/User.entity';

export interface NotificationEvent {
  type: NotificationType;
  user?: User;
  job?: Job;
  message?: string;
}

export enum NotificationType {
  MESSAGE = 'message',
  NEW_OFFER = 'newOffer',
  ACCEPTED_OFFER = 'acceptedOffer',
  DECLINED_OFFER = 'declinedOffer',
  NEW_PROPOSAL = 'newProposal',
  NEW_INTERVIEW = 'newInterview',
}
