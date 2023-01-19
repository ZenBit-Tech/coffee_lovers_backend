import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common/enums';
import { ExecutionContext } from '@nestjs/common/interfaces';
import { ValidationPipe } from '@nestjs/common/pipes';
import { User } from '@entities/User.entity';
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
    getPostedJobs: (user: User) => [{ id: 1, owner: user }],
    getPostedJobDetails: (user: User, id: number) => ({
      job: { id: +id },
      hires: [],
    }),
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

    it('wrong english level: should return status code 400', () => {
      return request(app.getHttpServer())
        .get('/jobs')
        .query({ english_level: 'test' })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('right english level: should return status code 400', () => {
      return request(app.getHttpServer())
        .get('/jobs')
        .query({ english_level: 'Intermediate' })
        .expect(HttpStatus.OK);
    });

    it('wrong start hourly rate: should return status code 400', () => {
      return request(app.getHttpServer())
        .get('/jobs')
        .query({ hourly_rate_start: 'test' })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('right start hourly rate: should return status code 200', () => {
      return request(app.getHttpServer())
        .get('/jobs')
        .query({ hourly_rate_start: '10' })
        .expect(HttpStatus.OK);
    });

    it('skills is array of numbers: should return status code 200', () => {
      return request(app.getHttpServer())
        .get('/jobs')
        .query({ skills: [1, 2, 3] })
        .expect(HttpStatus.OK);
    });

    it('wrong skills type: should return status code 400', () => {
      return request(app.getHttpServer())
        .get('/jobs')
        .query({ skills: 1 })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('wrong skill id type: should return status code 400', () => {
      return request(app.getHttpServer())
        .get('/jobs')
        .query({ skills: ['test'] })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/jobs/posted (GET) Get all posted jobs by user', () => {
    it('should return array', async () => {
      const response = await request(app.getHttpServer())
        .get('/jobs/posted')
        .expect(HttpStatus.OK);

      expect(Array.isArray(response.body));
    });

    it('should return job in array', async () => {
      const response = await request(app.getHttpServer())
        .get('/jobs/posted')
        .expect(HttpStatus.OK);

      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('owner');
      expect(response.body[0]).not.toHaveProperty('freelancer');
    });
  });

  describe('/jobs/posted/:id (GET) Get details of posted job', () => {
    it('should return object with job details and array of hires', () => {
      return request(app.getHttpServer())
        .get('/jobs/posted/1')
        .expect(HttpStatus.OK)
        .expect({
          job: { id: 1 },
          hires: [],
        });
    });

    it('wrong type id: should return status code 400', () => {
      return request(app.getHttpServer())
        .get('/jobs/posted/k')
        .expect(HttpStatus.BAD_REQUEST);
    });
  });
});
