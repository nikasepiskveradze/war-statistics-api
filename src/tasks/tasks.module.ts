import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Daily } from '../entities/daily.entity';
import { Event } from '../entities/event.entity';
import { SystemWide } from '../entities/system-wide.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Daily, Event, SystemWide])],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
