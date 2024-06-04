import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreateTournamentDto {
  @ApiProperty({ description: 'name of the tournament' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'the start date', example: '2023-12-31' })
  @IsDateString()
  startDate: Date;

  @ApiProperty({ description: 'the end date', example: '2023-12-31' })
  @IsDateString()
  endDate: Date;
}
