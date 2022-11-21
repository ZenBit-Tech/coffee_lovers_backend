import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import GetAllPropertiesDto from './dto/get-all-properties.dto';
import { PropertiesService } from './properties.service';

@ApiTags('properties')
@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @ApiOperation({ summary: 'get all properties' })
  @ApiResponse({ type: GetAllPropertiesDto })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @Get('')
  @UseGuards(JwtAuthGuard)
  getAll() {
    return this.propertiesService.getAllProperties();
  }
}
