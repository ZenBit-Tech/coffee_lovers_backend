import { Controller, Post, Get, Body } from '@nestjs/common';
import { TestService } from '@/modules/test/test.service';
import CreateTestDto from '@/modules/test/dto/create-test.dto';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post('create')
  create(@Body() dto: CreateTestDto) {
    return this.testService.create(dto);
  }

  @Get('all')
  getAll() {
    return this.testService.findAll();
  }
}
