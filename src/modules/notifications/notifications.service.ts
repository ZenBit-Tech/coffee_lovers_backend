import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { fromEvent, Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@entities/User.entity';
import { Notification } from '@entities/Notification.entity';
import { NotificationEvent } from './types';

@Injectable()
export class NotificationsService {
  constructor(
    private eventEmitter: EventEmitter2,
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  subscribe(user: User): Observable<unknown> {
    return fromEvent(this.eventEmitter, String(user.id));
  }

  emit(userId: number, notification: NotificationEvent): void {
    this.eventEmitter.emit(String(userId), { notification });

    this.notificationsRepository
      .createQueryBuilder()
      .insert()
      .into(Notification)
      .values([{ ...notification, to: { id: userId } }])
      .execute();
  }

  async getNotifications(user: User): Promise<Notification[]> {
    try {
      return await this.notificationsRepository
        .createQueryBuilder('notification')
        .where({ to: user, is_read: false })
        .orderBy('notification.created_at', 'DESC')
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
