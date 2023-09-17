import { Injectable } from '@nestjs/common';
import { TasksService } from './tasks/tasks.service';

@Injectable()
export class AppService {
  constructor(private tasksService: TasksService) {}

  async onApplicationBootstrap() {
    // console.log('here we initialize');
    await this.tasksService.importDailyStats();
  }
}
