import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Result } from 'src/results/entities/result.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { CreatePlayerDto } from './create-player.dto';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
  @ApiProperty({ description: 'The name of the Player' })
  @IsString()
  name?: string;

  @ApiProperty({ description: 'The nationality of the Player' })
  @IsString()
  nationality?: string;

  @ApiProperty({ description: 'The total score of the Player' })
  @IsNumber()
  totalScore?: number;

  @ApiProperty({ description: 'The tournaments the Player participated in' })
  tournaments?: Tournament[];

  @ApiProperty({ description: 'The results the Player won' })
  resultsWon?: Result[];

  @ApiProperty({ description: 'The results the Player lost' })
  resultsLost?: Result[];
}
