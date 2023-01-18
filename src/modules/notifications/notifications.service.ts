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
    this.eventEmitter.emit(String(userId), {
      data: { ...notification, created_at: new Date(Date.now()).toISOString() },
    });

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
        .leftJoinAndSelect('notification.user', 'user')
        .leftJoinAndSelect('notification.job', 'job')
        .where({ to: user, is_read: false })
        .orderBy('notification.created_at', 'DESC')
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async markAllNotificationsAsRead(user: User): Promise<void> {
    try {
      await this.notificationsRepository
        .createQueryBuilder()
        .update(Notification)
        .set({ is_read: true })
        .where('toId = :userId AND is_read = false', {
          userId: user.id,
        })
        .execute();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
