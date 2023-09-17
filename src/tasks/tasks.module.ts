import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Daily } from '../entities/daily.entity';
import { Abandoned } from '../entities/abandoned.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Daily, Abandoned])],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
