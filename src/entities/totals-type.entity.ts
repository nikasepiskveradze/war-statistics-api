import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TotalsType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  country: string;

  @Column()
  type: string;

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
