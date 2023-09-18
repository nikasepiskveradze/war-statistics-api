import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class System {
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
