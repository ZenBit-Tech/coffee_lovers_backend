import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { getAuthorizationApiHeader } from '@/common/utils/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { ReqUser } from '@/modules/user/dto/get-user-dto.dto';
import { RequsetService } from './requset.service';
import ReqBody from './dto/request-body-dto';
import OfferBody from './dto/offer-body-dto copy';
import getJobsWithoutOffer from './dto/get-jobs-withoutoffer.dto';
import { Job } from '@/common/entities/Job.entity';
import GetAvailableJobsAndCount from './dto/available-gobs-count.dto';

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

  @ApiOperation({
    summary: 'Get user jobs without offer',
  })
  @ApiHeader(getAuthorizationApiHeader())
  @ApiResponse({ type: getJobsWithoutOffer })
  @UseGuards(JwtAuthGuard)
  @Get('/withoutoffer/:fr')
  getJobsMissingOffer(@Request() req, @Param('fr') fr: number): Promise<Job[]> {
    return this.requsetService.getJobsWithoutOffer(req.user, fr);
  }

  @ApiOperation({
    summary: 'Get user jobs without invite',
  })
  @ApiHeader(getAuthorizationApiHeader())
  @ApiResponse({ type: GetAvailableJobsAndCount })
  @UseGuards(JwtAuthGuard)
  @Get('/withoutinvite/:fr')
  getJobsMissingInvite(
    @Request() req,
    @Param('fr') fr: number,
  ): Promise<Job[]> {
    return this.requsetService.getJobsWithoutInvite(req.user, fr);
  }
}
