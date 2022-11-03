import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
import { Test } from '@/common/entities/Test.entity';
import CreateTestDto from '@/modules/test/dto/create-test.dto';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private testRepository: Repository<Test>,
  ) {}

  async create(dto: CreateTestDto): Promise<InsertResult> {
    const data = await this.testRepository
      .createQueryBuilder()
      .insert()
      .into(Test)
      .values([dto])
      .execute();
    return data;
  }

  async findAll(): Promise<Test[]> {
    const data = await this.testRepository
      .createQueryBuilder()
      .select('id, name')
      .from(Test, 'id, name')
      .getMany();
    return data;
  }
}
