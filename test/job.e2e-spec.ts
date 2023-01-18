import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common/enums';
import { ExecutionContext } from '@nestjs/common/interfaces';
import { ValidationPipe } from '@nestjs/common/pipes';
import { JobsService } from '@/modules/jobs/job.service';
import { JobsController } from '@/modules/jobs/job.controller';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import GetJobsDto from '@/modules/jobs/dto/get-jobs.dto';

describe('JobController (e2e)', () => {
  let app: INestApplication;

  const jobService = {
    getJobById: (jobId: number) => ({ id: jobId }),
    getJobProposals: (jobId: number) => ({ job: { id: jobId }, proposals: [] }),
    findJobs: (param: GetJobsDto) => ({ jobs: [], meta: { totalCount: 0 } }),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [JobsController],
      providers: [
        {
          provide: JobsService,
          useValue: jobService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = { id: 1 };

          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('/jobs/:id/job (GET) job by id', () => {
    it('should return job by id', () => {
      return request(app.getHttpServer())
        .get('/jobs/1/job')
        .expect(HttpStatus.OK)
        .expect(jobService.getJobById(1));
    });

    it('wrong id type: should return status code 400', () => {
      return request(app.getHttpServer())
        .get('/jobs/k/job')
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/jobs/:id/proposals (GET) get proposals by job', () => {
    it('should return proposals by job id', () => {
      return request(app.getHttpServer())
        .get('/jobs/1/proposals')
        .expect(HttpStatus.OK)
        .expect(jobService.getJobProposals(1));
    });

    it('wrong id type: should return status code 400', () => {
      return request(app.getHttpServer())
        .get('/jobs/k/proposals')
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/jobs (GET) find jobs', () => {
    it('should return object with jobs array and total count', () => {
      return request(app.getHttpServer())
        .get('/jobs')
        .expect(HttpStatus.OK)
        .expect({
          jobs: [],
          meta: {
            totalCount: 0,
          },
        });
    });
  });
});
