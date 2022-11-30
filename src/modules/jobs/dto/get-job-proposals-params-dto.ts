import { ApiProperty } from '@nestjs/swagger';

export default class getJobProposalsParamsDto {
  @ApiProperty({ example: 1 })
  id: number;
}
