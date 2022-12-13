import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TestService } from '@/modules/test/test.service';
import CreateTestDto from '@/modules/test/dto/create-test.dto';

@ApiTags('test')
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @ApiOperation({ summary: 'test post' })
  @Post('create')
  create(@Body() dto: CreateTestDto) {
    return this.testService.create(dto);
  }

  @ApiOperation({ summary: 'test get' })
  @Get('all')
  getAll() {
    return this.testService.findAll();
  }
}
