import {
  Controller,
  Get,
  HttpStatus,
  HttpCode,
  Post,
  Request,
  Body,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { getAuthorizationApiHeader } from '@utils/swagger';
import { Job } from '@entities/Job.entity';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { JobsService } from './job.service';
import CreateJobDto from './dto/create-job.dto';
import GetJobsDto from './dto/get-jobs.dto';
import FindJobsResponse from './dto/find-jobs-response.dto';
import CreateProposalDto from './dto/create-proposal.dto';
import getJobProposalsResponseDto from './dto/get-job-proposals-response.dto';
import getJobInfoParamsDto from './dto/get-job-info-params-dto';
import UpdateJobDto from './dto/update-job.dto';
import getJobByIdResponseDto from './dto/get-job-response.dto';
import GetPostedJobsResponseDto from './dto/get-posted-jobs-response.dto';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @ApiOperation({ summary: 'Find jobs' })
  @ApiHeader(getAuthorizationApiHeader())
  @ApiResponse({ type: FindJobsResponse })
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async findJobs(@Query() params: GetJobsDto): Promise<FindJobsResponse> {
    return this.jobsService.findJobs(params);
  }

  @ApiOperation({ summary: 'Get all posted jobs by user' })
  @ApiHeader(getAuthorizationApiHeader())
  @ApiResponse({ type: [GetPostedJobsResponseDto] })
  @UseGuards(JwtAuthGuard)
  @Get('/posted')
  async getPostedJobs(@Request() req): Promise<Job[]> {
    return this.jobsService.getPostedJobs(req.user);
  }

  @ApiOperation({ summary: 'Add job' })
  @ApiHeader(getAuthorizationApiHeader())
  @Post('/')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  createJob(@Request() req, @Body() payload: CreateJobDto): Promise<void> {
    return this.jobsService.createJob(payload, req.user);
  }

  @ApiOperation({ summary: 'Create proposal for job' })
  @ApiHeader(getAuthorizationApiHeader())
  @UseGuards(JwtAuthGuard)
  @Post('/proposal')
  @HttpCode(HttpStatus.OK)
  createProposal(
    @Request() req,
    @Body() payload: CreateProposalDto,
  ): Promise<void> {
    return this.jobsService.createProposal(payload, req.user);
  }

  @ApiOperation({ summary: 'Get proposals of job' })
  @ApiHeader(getAuthorizationApiHeader())
  @ApiResponse({ type: getJobProposalsResponseDto })
  @UseGuards(JwtAuthGuard)
  @Get(':id/proposals')
  getJobProposals(
    @Request() req,
    @Param() params: getJobInfoParamsDto,
  ): Promise<getJobProposalsResponseDto> {
    return this.jobsService.getJobProposals(+params.id, req.user);
  }

  @ApiOperation({
    summary: 'Get jobs of jobowner without chat with any freelancer yet',
  })
  @ApiHeader(getAuthorizationApiHeader())
  @ApiResponse({ type: Array<Job> })
  @UseGuards(JwtAuthGuard)
  @Get('/userjobs')
  getUserJobs(@Request() req): Promise<Job[]> {
    return this.jobsService.getAvailableJobs(req.user);
  }

  @ApiOperation({ summary: 'Get job by id' })
  @ApiHeader(getAuthorizationApiHeader())
  @ApiResponse({ type: getJobByIdResponseDto })
  @UseGuards(JwtAuthGuard)
  @Get('/:id/job')
  getJobById(
    @Param() params: getJobInfoParamsDto,
  ): Promise<getJobByIdResponseDto> {
    return this.jobsService.getJobById(+params.id);
  }

  @ApiOperation({ summary: 'Update job' })
  @ApiHeader(getAuthorizationApiHeader())
  @Post('/update')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  updateJob(@Request() req, @Body() payload: UpdateJobDto): Promise<void> {
    return this.jobsService.updateJob(payload, req.user);
  }
}
