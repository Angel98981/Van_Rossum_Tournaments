import { IsInt, IsOptional } from 'class-validator';

export class UpdateResultDto {
  @IsInt()
  @IsOptional()
  winnerId?: number;

  @IsInt()
  @IsOptional()
  loserId?: number;

  @IsInt()
  @IsOptional()
  winnerScore?: number;

  @IsInt()
  @IsOptional()
  loserScore?: number;
}
