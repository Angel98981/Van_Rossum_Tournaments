import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { ApiTags } from '@nestjs/swagger';
import { Tournament } from './entities/tournament.entity';

@ApiTags('Tournaments')
@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Post()
  async create(
    @Body() createTournamentDto: CreateTournamentDto,
  ): Promise<{ message: string; data: Tournament }> {
    return await this.tournamentsService.create(createTournamentDto);
  }

  @Get(':tournamentId/participants')
  findOneWithParticipants(@Param('tournamentId') tournamentId: number) {
    return this.tournamentsService.findOneWithParticipants(tournamentId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTournamentDto: UpdateTournamentDto,
  ) {
    return await this.tournamentsService.update(+id, updateTournamentDto);
  }
  @Put(':tournamentId/participants/:playerId')
  addParticipant(
    @Param('tournamentId') tournamentId: number,
    @Param('playerId') playerId: number,
  ) {
    return this.tournamentsService.addParticipant(tournamentId, playerId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tournamentsService.remove(+id);
  }
  @Post(':tournamentId/random-matches')
  assignRandomMatches(@Param('tournamentId') tournamentId: number) {
    return this.tournamentsService.assignRandomMatches(tournamentId);
  }
}
