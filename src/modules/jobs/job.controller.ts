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
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { JobsService } from './job.service';
import AddJobDescriptionDto from './dto/create-job.dto';
import GetJobsDto from './dto/get-jobs.dto';
import FindJobsResponse from './dto/find-jobs-response.dto';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @ApiOperation({ summary: 'Find jobs' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiResponse({ type: FindJobsResponse })
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async findJobs(@Query() params: GetJobsDto): Promise<FindJobsResponse> {
    return this.jobsService.findJobs(params);
  }

  @ApiOperation({ summary: 'Add job' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @Post('/')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  createJob(
    @Request() req,
    @Body() payload: AddJobDescriptionDto,
  ): Promise<void> {
    return this.jobsService.createJob(payload, req.user);
  }
}
