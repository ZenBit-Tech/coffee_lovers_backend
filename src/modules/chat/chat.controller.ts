import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Param,
  Query,
  Sse,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Message } from '@entities/Message.entity';
import { Conversation } from '@entities/Conversation.entity';
import { Observable } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { getAuthorizationApiHeader } from '@/common/utils/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { ReqUser } from '@/modules/user/dto/get-user-dto.dto';
import { SseAuthGuard } from '@/modules/auth/guards/sse-auth.guard';
import NotificationResponseDto from '@/modules/notifications/dto/notification-response.dto';
import CreateConversationDto from './dto/create-conversation.dto';
import { ChatService } from './chat.service';
import { GetConversationsDto } from './dto/get-conversations.dto';
import { GetMessagesDto } from './dto/get-messages.dto';
import { GetMessagesResponse } from './dto/get-messages-response.dto';
import { GetConversationsResponseDto } from './dto/get-conversations-response.dto';
import { NotificationsService } from '../notifications/notifications.service';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly notificationService: NotificationsService,
  ) {}

  @ApiOperation({ summary: 'Get messages of conversation' })
  @ApiHeader(getAuthorizationApiHeader())
  @ApiResponse({ type: [GetMessagesResponse] })
  @UseGuards(JwtAuthGuard)
  @Get('/messages/:id')
  getMessages(
    @Request() req: ReqUser,
    @Param() params: GetMessagesDto,
  ): Promise<Message[]> {
    return this.chatService.getMessages(req.user, +params.id);
  }

  @ApiOperation({ summary: 'Subscribe to typing event' })
  @ApiParam({ name: 'token', description: 'access token' })
  @Sse('/type')
  @UseGuards(SseAuthGuard)
  sendTyping(@Request() req: ReqUser): Observable<unknown> {
    return this.notificationService.subscribe(req.user);
  }

  @ApiOperation({ summary: 'Create new conversation' })
  @ApiHeader(getAuthorizationApiHeader())
  @UseGuards(JwtAuthGuard)
  @Post('/')
  createConversation(
    @Request() req: ReqUser,
    @Body() payload: CreateConversationDto,
  ): Promise<void> {
    return this.chatService.createConversation(req.user, payload);
  }

  @ApiOperation({ summary: 'Get conversations' })
  @ApiHeader(getAuthorizationApiHeader())
  @ApiResponse({ type: [GetConversationsResponseDto] })
  @Get('/')
  @UseGuards(JwtAuthGuard)
  getConversations(
    @Request() req: ReqUser,
    @Query() params: GetConversationsDto,
  ): Promise<Conversation[]> {
    return this.chatService.getConversations(req.user, params);
  }
}
