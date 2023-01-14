import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Offer } from '@entities/Offer.entity';
import { Request as RequestEntity } from '@entities/Request.entity';
import { getAuthorizationApiHeader } from '@/common/utils/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { ReqUser } from '@/modules/user/dto/get-user-dto.dto';
import { RequsetService } from './requset.service';
import ReqBody from './dto/request-body-dto';
import OfferBody from './dto/offer-body-dto';
import getJobsWithoutOffer from './dto/get-jobs-withoutoffer.dto';
import { Job } from '@/common/entities/Job.entity';
import GetAvailableJobsAndCount from './dto/available-gobs-count.dto';
import GetOffersByUserResponseDto from './dto/get-offers-by-user-response.dto';
import GetInterviewsByUserResponseDto from './dto/get-interviews-by-user-response.dto';

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

  @ApiOperation({ summary: "Get all freelancer's offers" })
  @ApiHeader(getAuthorizationApiHeader())
  @ApiResponse({ type: [GetOffersByUserResponseDto] })
  @UseGuards(JwtAuthGuard)
  @Get('/offers')
  getOffersByUser(@Request() req: ReqUser): Promise<Offer[]> {
    return this.requsetService.getOffersByUser(req.user);
  }

  @ApiOperation({ summary: "Get all freelancer's interviews invintations" })
  @ApiHeader(getAuthorizationApiHeader())
  @ApiResponse({ type: [GetInterviewsByUserResponseDto] })
  @UseGuards(JwtAuthGuard)
  @Get('/interviews')
  getInterviewsByUser(@Request() req: ReqUser): Promise<RequestEntity[]> {
    return this.requsetService.getInterviewsByUser(req.user);
  }

  @ApiOperation({ summary: 'Accept offer by id' })
  @ApiHeader(getAuthorizationApiHeader())
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/accept/offer/:id')
  acceptOffer(@Request() req: ReqUser, @Param('id') id: number): Promise<void> {
    return this.requsetService.acceptOffer(req.user, id);
  }

  @ApiOperation({ summary: 'Decline offer by id' })
  @ApiHeader(getAuthorizationApiHeader())
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/decline/offer/:id')
  declineOffer(
    @Request() req: ReqUser,
    @Param('id') id: number,
  ): Promise<void> {
    return this.requsetService.declineOffer(req.user, id);
  }

  @ApiOperation({ summary: 'Delete interview by id' })
  @ApiHeader(getAuthorizationApiHeader())
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('interview/:id')
  deleteInterview(
    @Request() req: ReqUser,
    @Param('id') id: number,
  ): Promise<void> {
    return this.requsetService.deleteInterview(req.user, id);
  }
}
