import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  origin: string;

  @Column()
  system: string;

  @Column()
  status: string;

  @Column()
  url: string;

  @Column()
  date: string;
}
