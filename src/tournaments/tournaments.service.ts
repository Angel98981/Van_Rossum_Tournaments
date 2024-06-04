import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository } from 'typeorm';
import { Player } from 'src/players/entities/player.entity';
import { Result } from 'src/results/entities/result.entity';

@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
  ) {}
  async create(
    createTournamentDto: CreateTournamentDto,
  ): Promise<{ message: string; data: Tournament }> {
    try {
      const tournament =
        await this.tournamentRepository.create(createTournamentDto);
      await this.tournamentRepository.save(tournament);
      return {
        message: 'Tournament created successfully',
        data: tournament,
      };
    } catch (err) {
      return {
        message: err.message,
        data: null,
      };
    }
  }

  async addParticipant(
    tournamentId: number,
    playerId: number,
  ): Promise<Tournament> {
    const tournament = await this.tournamentRepository.findOne({
      where: { id: tournamentId },
      relations: ['participants'],
    });
    const player = await this.playerRepository.findOne({
      where: { id: playerId },
    });

    if (tournament && player) {
      tournament.participants.push(player);
      return this.tournamentRepository.save(tournament);
    }
    throw new Error('Tournament or Player not found');
  }

  async findOneWithParticipants(tournamentId: number): Promise<Tournament> {
    const tournament = await this.tournamentRepository.findOne({
      where: { id: tournamentId },
      relations: ['participants'],
    });

    if (!tournament) {
      throw new Error('Tournament not found');
    }

    return tournament;
  }

  async update(
    id: number,
    updateTournamentDto: UpdateTournamentDto,
  ): Promise<Tournament> {
    const tournament: Tournament = await this.tournamentRepository.findOne({
      where: { id: id },
    });
    Object.assign(tournament, updateTournamentDto);
    return await this.tournamentRepository.save(tournament);
  }

  async remove(id: number): Promise<Tournament> {
    const tournament: Tournament = await this.tournamentRepository.findOne({
      where: { id: id },
    });
    return await this.tournamentRepository.softRemove(tournament);
  }
  async assignRandomMatches(tournamentId: number): Promise<Result[]> {
    const tournament = await this.tournamentRepository.findOne({
      where: { id: tournamentId },
      relations: ['participants'],
    });

    if (!tournament) {
      throw new Error('Tournament not found');
    }

    const participants = tournament.participants;
    if (participants.length < 2) {
      throw new Error('Not enough participants to create matches');
    }

    const results: Result[] = [];
    const shuffledPlayers = participants.sort(() => 0.5 - Math.random());

    for (let i = 0; i < shuffledPlayers.length - 1; i += 2) {
      const result = new Result();
      result.tournament = tournament;
      result.winner = shuffledPlayers[i];
      result.loser = shuffledPlayers[i + 1];
      result.winnerScore = Math.floor(Math.random() * 10);
      result.loserScore = Math.floor(Math.random() * 10);
      results.push(result);
    }

    return this.resultRepository.save(results);
  }
}
