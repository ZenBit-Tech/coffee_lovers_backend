import {
  Body,
  Controller,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { getAuthorizationApiHeader } from '@/common/utils/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { ReqUser } from '@/modules/user/dto/get-user-dto.dto';
import { RequsetService } from './requset.service';
import ReqBody from './dto/request-body-dto';
import OfferBody from './dto/offer-body-dto copy';

@ApiTags('request')
@Controller('request')
export class RequstController {
  constructor(private readonly requsetService: RequsetService) {}

  @ApiOperation({ summary: 'Post invite' })
  @ApiHeader(getAuthorizationApiHeader())
  @UseGuards(JwtAuthGuard)
  @Post('/:fr/:job')
  createRequest(
    @Request() req: ReqUser,
    @Param('fr') fr: number,
    @Param('job') job: number,
    @Body() body: ReqBody,
  ): Promise<void> {
    return this.requsetService.addRequest(req.user, body, fr, job);
  }

  @ApiOperation({ summary: 'Post offer' })
  @ApiHeader(getAuthorizationApiHeader())
  @UseGuards(JwtAuthGuard)
  @Post('/offer/:fr/:job')
  createOffer(
    @Request() req: ReqUser,
    @Param('fr') fr: number,
    @Param('job') job: number,
    @Body() body: OfferBody,
  ): Promise<void> {
    return this.requsetService.addOffer(req.user, job, fr, body);
  }
}
