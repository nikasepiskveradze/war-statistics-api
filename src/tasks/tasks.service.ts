import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DataUrl } from './data-url.enum';
const csv = require('csvtojson');

@Injectable()
export class TasksService {
  constructor() {}

  // @Cron(CronExpression.EVERY_10_SECONDS)
  importDailyStats() {
    // console.log('running every 10 seconds');
    return this.fetchStats(DataUrl.DailyStats);
  }

  private async fetchStats(url: DataUrl) {
    const response = await fetch(url);
    const data = await response.text();
    const jsonData = await csv().fromString(data);

    return jsonData;
  }
}
