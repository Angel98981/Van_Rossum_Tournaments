import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateResultDto {
  @IsInt()
  @IsNotEmpty()
  tournamentId: number;

  @IsInt()
  @IsNotEmpty()
  winnerId: number;

  @IsInt()
  @IsNotEmpty()
  loserId: number;

  @IsInt()
  @IsNotEmpty()
  winnerScore: number;

  @IsInt()
  @IsNotEmpty()
  loserScore: number;
}
