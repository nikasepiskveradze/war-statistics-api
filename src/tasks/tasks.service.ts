import { Injectable } from '@nestjs/common';
import { DataUrl } from '../enums/data-url.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Daily } from '../entities/daily.entity';
import { Repository } from 'typeorm';
import { DailyStat } from '../types/daily-stats';
import { AbandonedStat } from '../types/abandoned';
import { Abandoned } from '../entities/abandoned.entity';

const csv = require('csvtojson');

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Daily) private dailyRepository: Repository<Daily>,
    @InjectRepository(Abandoned)
    private abandonedRepository: Repository<Abandoned>,
  ) {}

  async importDailyStats() {
    const dailyStats: DailyStat[] = await this.fetchStats(DataUrl.DailyStats);
    const mappedDailyStats = dailyStats.map((item) => ({
      country: item.country,
      type: item.equipment_type,
      destroyed: parseInt(item.destroyed),
      abandoned: parseInt(item.abandoned),
      captured: parseInt(item.captured),
      damaged: parseInt(item.damaged),
      total: parseInt(item.type_total),
      date: item.date_recorded,
    })) as Daily[];

    const dailyEntries = await this.dailyRepository.find();
    if (dailyEntries.length > 0) {
      await this.dailyRepository.delete(dailyEntries.map((item) => item.id));
    }

    await this.dailyRepository.save(mappedDailyStats);
  }

  async importAbandoned() {
    const abandonedStats: AbandonedStat[] = await this.fetchStats(
      DataUrl.Abandoned,
    );
    const abandonedItems = abandonedStats.map((item) => ({
      country: item.country,
      origin: item.origin,
      system: item.system,
      url: item.url,
      date: item.date_recorded,
    })) as Abandoned[];

    const abandonedEntries = await this.abandonedRepository.find();
    if (abandonedEntries.length > 0) {
      await this.abandonedRepository.delete(
        abandonedEntries.map((item) => item.id),
      );
    }

    await this.abandonedRepository.save(abandonedItems);
  }

  private async fetchStats(url: DataUrl) {
    const response = await fetch(url);
    const data = await response.text();

    return csv().fromString(data);
  }
}
