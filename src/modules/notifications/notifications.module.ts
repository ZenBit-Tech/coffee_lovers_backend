import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Notification } from '@entities/Notification.entity';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  imports: [
    TypeOrmModule.forFeature([Notification]),
    EventEmitterModule.forRoot(),
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}
