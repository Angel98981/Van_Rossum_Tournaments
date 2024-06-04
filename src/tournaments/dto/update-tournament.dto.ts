import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate } from 'class-validator';

export class UpdateTournamentDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name?: string;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  endDate?: Date;
}
