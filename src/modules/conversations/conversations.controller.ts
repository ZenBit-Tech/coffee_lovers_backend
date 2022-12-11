import { Controller, UseGuards, Param, Get, Req } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { InviteService } from './conversations.service';
import { getAuthorizationApiHeader } from '@/common/utils/swagger';
import {
  ConversResponse,
  RequestResponse,
} from './dto/conversations-freelancer.dto';
import { Request } from '@/common/entities/Request.entity';
import { Job } from '@/common/entities/Job.entity';

@ApiTags('invite')
@Controller('invite')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @ApiOperation({
    summary: 'Check weather jobOwner has chat with freelancer about job',
  })
  @ApiHeader(getAuthorizationApiHeader())
  @UseGuards(JwtAuthGuard)
  @Get('/:fr')
  checkChatOpened(
    @Req() req,
    @Param('fr') frId: number,
  ): Promise<ConversResponse | null> {
    return this.inviteService.checkChatAvailability(req.user, frId);
  }
}
