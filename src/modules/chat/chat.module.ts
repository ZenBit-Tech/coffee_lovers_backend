import { Module } from '@nestjs/common';
import { UserModule } from '@/modules/user/user.module';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';

@Module({
  providers: [ChatGateway],
  controllers: [ChatController],
  imports: [UserModule],
})
export class ChatModule {}
