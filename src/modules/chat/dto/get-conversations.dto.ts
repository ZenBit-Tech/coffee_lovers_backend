import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetConversationsDto {
  @ApiPropertyOptional({ example: 'freelance' })
  @IsOptional()
  @IsString()
  search?: string;
}
