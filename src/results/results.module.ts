import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { Player } from 'src/players/entities/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Result, Tournament, Player])],
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule {}
