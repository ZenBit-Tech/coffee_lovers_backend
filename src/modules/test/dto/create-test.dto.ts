import { ApiProperty } from '@nestjs/swagger';

export default class CreateTestDto {
  @ApiProperty({ example: 'test' })
  readonly name: string;
}
