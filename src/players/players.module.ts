import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Player,
  Player_tournament_id_tournament,
} from './entities/player.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Player,
      Player_tournament_id_tournament,
      Tournament,
    ]),
  ],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
