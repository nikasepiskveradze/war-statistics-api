import { Injectable } from '@nestjs/common';
import { TasksService } from './tasks/tasks.service';

@Injectable()
export class AppService {
  constructor(private tasksService: TasksService) {}

  async onApplicationBootstrap() {
    // await this.tasksService.importDailyStats();
    await this.tasksService.importAbandoned();
  }
}
