import { Controller, Get } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';

@Controller('chat')
export class ChatController {
  @Get('/messages')
  async getMessages(): Promise<MessageDto[]> {
    return [];
  }
}
