import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { authorizationHeader, ChatEvents } from '@constants/websocket';
import { minRoomJoins } from '@constants/chat';
import { WsAuthGuard } from '@/modules/auth/guards/ws-auth.guard';
import { UserHandshake } from './types';
import { CreateMessageDto } from './dto/create-message.dto';
import { ConversationDto } from './dto/conversation.dto';
import { MessageDto } from './dto/message.dto';
import { ChatService } from './chat.service';

@UseGuards(WsAuthGuard)
@WebSocketGateway(+process.env['WS_PORT'], {
  cors: {
    origin: process.env['CLIENT_URL'],
    methods: ['GET', 'POST'],
    allowedHeaders: [authorizationHeader],
    credentials: true,
  },
})
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(ChatEvents.MESSAGE)
  handleMessage(
    @MessageBody() payload: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ): void {
    const user = (client?.handshake as unknown as UserHandshake)?.user;
    const message: MessageDto = {
      from: user,
      ...payload,
      created_at: new Date(),
    };

    this.chatService.createMessage(
      {
        ...payload,
        is_read:
          this.server.sockets.adapter.rooms.get(String(payload.conversation))
            .size > minRoomJoins,
      },
      user,
    );

    this.server
      .to(String(payload.conversation))
      .emit(ChatEvents.MESSAGE, message);
  }

  @SubscribeMessage(ChatEvents.JOIN_CONVERSATION)
  handleJoinConversation(
    @MessageBody() payload: ConversationDto,
    @ConnectedSocket() client: Socket,
  ): void {
    client.join(String(payload.conversation));
  }

  @SubscribeMessage(ChatEvents.LEAVE_CONVERSATION)
  handleLeaveConversation(
    @MessageBody() payload: ConversationDto,
    @ConnectedSocket() client: Socket,
  ): void {
    client.leave(String(payload.conversation));
  }
}
