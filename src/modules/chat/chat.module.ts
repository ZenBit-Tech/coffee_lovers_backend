import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from '@entities/Request.entity';
import { Conversation } from '@entities/Conversation.entity';
import { Message } from '@entities/Message.entity';
import { UserModule } from '@/modules/user/user.module';
import { RequestModule } from '@/modules/requests/request.module';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
  imports: [
    TypeOrmModule.forFeature([Request, Conversation, Message]),
    UserModule,
    RequestModule,
  ],
})
export class ChatModule {}
