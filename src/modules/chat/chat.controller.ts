import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { getAuthorizationApiHeader } from '@/common/utils/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { MessageDto } from './dto/message.dto';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  @ApiOperation({ summary: 'Get messages of conversation' })
  @ApiHeader(getAuthorizationApiHeader())
  @UseGuards(JwtAuthGuard)
  @Get('/messages')
  async getMessages(): Promise<MessageDto[]> {
    return [];
  }
}
