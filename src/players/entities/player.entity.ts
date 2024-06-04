import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Tournament } from '../../tournaments/entities/tournament.entity';
import { Result } from '../../results/entities/result.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  nationality: string;

  @Column('int', { default: 0 })
  totalScore: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => Tournament, (tournament) => tournament.participants)
  @JoinTable()
  tournaments: Tournament[];

  @OneToMany(() => Result, (result) => result.winner)
  resultsWon: Result;

  @OneToMany(() => Result, (result) => result.loser)
  resultsLost: Result;
}

@Entity()
export class Player_tournament_id_tournament {
  @PrimaryColumn()
  id: number;
  @Column({ type: 'int' })
  playerId: number;

  @Column({ type: 'int' })
  tournamentId: number;
}
