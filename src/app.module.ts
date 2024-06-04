import { Module } from '@nestjs/common';
import { TournamentsModule } from './tournaments/tournaments.module';
import { PlayersModule } from './players/players.module';
import { ResultsModule } from './results/results.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TournamentsModule,
    PlayersModule,
    ResultsModule,

    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      retryDelay: 3000,
      retryAttempts: 3,
    }),
    TypeOrmModule.forFeature([TournamentsModule, PlayersModule, ResultsModule]),
  ],
  exports: [TypeOrmModule, TournamentsModule, PlayersModule, ResultsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
