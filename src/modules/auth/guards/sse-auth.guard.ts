import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SseAuthGuard extends AuthGuard('ssejwt') {}
