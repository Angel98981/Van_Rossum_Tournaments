import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import {
  Player,
  Player_tournament_id_tournament,
} from './entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Tournament } from 'src/tournaments/entities/tournament.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    @InjectRepository(Player_tournament_id_tournament)
    private readonly playerTournametRepository: Repository<Player_tournament_id_tournament>,
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
  ) {}
  async create(
    createPlayerDto: CreatePlayerDto,
  ): Promise<{ message: string; data: Player }> {
    try {
      const player: Player = await this.playerRepository.create({
        name: createPlayerDto.name,
        nationality: createPlayerDto.nationality,
        totalScore: createPlayerDto.totalScore,
        resultsWon: createPlayerDto.resultsWon,
        resultsLost: createPlayerDto.resultsLost,
      } as DeepPartial<Player>);

      return {
        message: 'Player created successfully',
        data: player,
      };
    } catch (err) {
      return {
        message: err.message,
        data: null,
      };
    }
  }
  async addTournament(playerId: number, tournamentId: number): Promise<Player> {
    const player = await this.playerRepository.findOne({
      where: { id: playerId },
      relations: ['tournaments'],
    });
    const tournament = await this.tournamentRepository.findOne({
      where: {
        id: tournamentId,
      },
    });

    if (player && tournament) {
      player.tournaments.push(tournament);
      return this.playerRepository.save(player);
    }
    throw new Error('Player or Tournament not found');
  }

  async findOne(id: number): Promise<Player> {
    const player: Player = await this.playerRepository.findOne({
      where: {
        id: id,
      },
    });
    return player;
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<void> {
    const player: Player = await this.playerRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!player) {
      throw new Error('Player not found');
    }
    await this.playerRepository.update(
      {
        id: id,
      },
      {
        name: updatePlayerDto.name,
        nationality: updatePlayerDto.nationality,
        totalScore: updatePlayerDto.totalScore,

        resultsWon: updatePlayerDto.resultsWon.map((result) => ({
          id: result,
        })),
        resultsLost: updatePlayerDto.resultsLost.map((result) => ({
          id: result,
        })),
      } as DeepPartial<Player>,
    );
  }

  async remove(id: number): Promise<Player> {
    {
      const player: Player = await this.playerRepository.findOne({
        where: {
          id: id,
        },
      });
      return await this.playerRepository.softRemove(player);
    }
  }
}
