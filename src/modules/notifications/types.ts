import { User } from '@entities/User.entity';

export interface NotificationEvent {
  type: NotificationType;
  user?: User;
  message?: string;
}

export enum NotificationType {
  MESSAGE = 'message',
  OFFER = 'offer',
}
