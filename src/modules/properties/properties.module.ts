import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from '@entities/Skill.entity';
import { Category } from '@entities/Category.entity';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { User } from '@/common/entities/User.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Skill, User])],
  controllers: [PropertiesController],
  providers: [PropertiesService],
  exports: [],
})
export class PropertiesModule {}
