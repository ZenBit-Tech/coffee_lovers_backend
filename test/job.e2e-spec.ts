import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { HttpStatus } from '@nestjs/common/enums';
import { ExecutionContext } from '@nestjs/common/interfaces';
import { JobsService } from '@/modules/jobs/job.service';
import { JobsController } from '@/modules/jobs/job.controller';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

describe('JobController (e2e)', () => {
  let app: INestApplication;

  const jobService = {
    getJobById: (jobId: number) => ({ id: jobId }),
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
    await app.init();
  });

  it('/jobs/:id/job (GET) job by id', () => {
    return request(app.getHttpServer())
      .get('/jobs/1/job')
      .expect(HttpStatus.OK)
      .expect(jobService.getJobById(1));
  });
});
