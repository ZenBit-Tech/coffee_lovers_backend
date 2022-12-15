import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Param,
  Query,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Message } from '@entities/Message.entity';
import { Conversation } from '@entities/Conversation.entity';
import { getAuthorizationApiHeader } from '@/common/utils/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { ReqUser } from '@/modules/user/dto/get-user-dto.dto';
import CreateConversationDto from './dto/create-conversation.dto';
import { ChatService } from './chat.service';
import { GetConversationsDto } from './dto/get-conversations.dto';
import { GetMessagesDto } from './dto/get-messages.dto';
import { GetMessagesResponse } from './dto/get-messages-response.dto';
import { GetConversationsResponseDto } from './dto/get-conversations-response.dto';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

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
