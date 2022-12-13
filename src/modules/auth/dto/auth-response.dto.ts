import { ApiProperty } from '@nestjs/swagger';

export default class AuthResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFp4NDl9.nw3Ksx0HViWeVaXigLeGpcexMjgOnpVy10aTh0KY-l8',
  })
  access_token: string;
}
