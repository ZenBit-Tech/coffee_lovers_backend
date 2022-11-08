import { IsString } from 'class-validator';

export default class RefreshDto {
  @IsString()
  readonly token: string;
}
