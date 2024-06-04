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
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { ApiTags } from '@nestjs/swagger';
import { Player } from './entities/player.entity';

@ApiTags('Players')
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async create(
    @Body() createPlayerDto: CreatePlayerDto,
  ): Promise<{ message: string; data: Player }> {
    return await this.playersService.create(createPlayerDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Player> {
    return await this.playersService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ): Promise<void> {
    return await this.playersService.update(+id, updatePlayerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Player> {
    return await this.playersService.remove(+id);
  }

  @Put(':playerId/tournaments/:tournamentId')
  addTournament(
    @Param('playerId') playerId: number,
    @Param('tournamentId') tournamentId: number,
  ) {
    return this.playersService.addTournament(playerId, tournamentId);
  }
}
