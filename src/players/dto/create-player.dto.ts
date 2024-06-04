import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Result } from 'src/results/entities/result.entity';

export class CreatePlayerDto {
  @ApiProperty({ description: 'The name of the Player' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The nationality of the Player' })
  @IsNotEmpty()
  @IsString()
  nationality: string;

  @ApiProperty({ description: 'The total score of the Player' })
  @IsNotEmpty()
  @IsNumber()
  totalScore: number;

  @ApiProperty({ description: 'The results the Player won' })
  resultsWon: Result[];

  @ApiProperty({ description: 'The results the Player lost' })
  resultsLost: Result[];
}
