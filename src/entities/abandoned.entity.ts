import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Abandoned {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  origin: string;

  @Column()
  system: string;

  @Column()
  url: string;

  @Column()
  date: string;
}
