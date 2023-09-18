import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SystemWide {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  system: string;

  @Column()
  destroyed: number;

  @Column()
  abandoned: number;

  @Column()
  captured: number;

  @Column()
  damaged: number;

  @Column()
  total: number;
}
