import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { fromEvent, Observable } from 'rxjs';
import { User } from '@entities/User.entity';
import { Notification } from '@entities/Notification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  emit(userId: number, data: NotificationEvent) {
    this.eventEmitter.emit(String(userId), { data });
  }

  async getNotifications(user: User): Promise<Notification[]> {
    try {
      return await this.notificationsRepository
        .createQueryBuilder('notification')
        .where({ user })
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
