import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from '@entities/Skill.entity';
import { Category } from '@entities/Category.entity';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Skill])],
  controllers: [PropertiesController],
  providers: [PropertiesService],
})
export class PropertiesModule {}
