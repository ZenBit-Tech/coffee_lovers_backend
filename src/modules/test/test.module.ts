import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestController } from '@/modules/test/test.controller';
import { TestService } from '@/modules/test/test.service';
import { Test } from '@/common/entities/Test.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Test])],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
