import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class WsAuthGuard extends AuthGuard('wsjwt') {
  getRequest(context: ExecutionContext) {
    return context.switchToWs().getClient().handshake;
  }
}
