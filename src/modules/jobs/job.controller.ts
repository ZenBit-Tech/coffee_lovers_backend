import {
  Controller,
  Get,
  HttpStatus,
  HttpCode,
  Post,
  Request,
  Body,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import AddJobDescriptionDto from './dto/add-user-job.dto';
import { JobsService } from './job.service';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @ApiOperation({ summary: 'get all jobs' })
  @Get('/')
  @HttpCode(HttpStatus.OK)
  getAllJobs() {
    return this.jobsService.getAllJobs();
  }

  @ApiOperation({ summary: 'add new job' })
  @Post('/')
  @HttpCode(HttpStatus.OK)
  addnewJob(@Request() req, @Body() payload: AddJobDescriptionDto) {
    return this.jobsService.addJobInfo(payload, req.user);
  }
}
