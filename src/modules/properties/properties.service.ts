import {
  Injectable,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '@entities/Category.entity';
import { Skill } from '@entities/Skill.entity';
import { EnglishLevel } from '@constants/entities';
import PropertyDto from './dto/property-dto';
import GetAllPropertiesDto from './dto/get-all-properties.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(Skill)
    private skillsRepository: Repository<Skill>,
  ) {}

  async findAllCategories(): Promise<PropertyDto[]> {
    try {
      return await this.categoriesRepository
        .createQueryBuilder()
        .select('id, name')
        .from(Category, 'id, name')
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAllSkills(): Promise<PropertyDto[]> {
    try {
      return await this.skillsRepository
        .createQueryBuilder()
        .select('id, name')
        .from(Skill, 'id, name')
        .getMany();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getAllProperties(): Promise<GetAllPropertiesDto> {
    try {
      const categories = await this.findAllCategories();
      const skills = await this.findAllSkills();

      return {
        categories,
        skills,
        englishLevels: Object.values(EnglishLevel),
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
