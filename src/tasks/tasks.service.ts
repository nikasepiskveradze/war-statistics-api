import { Injectable } from '@nestjs/common';
import { DataUrl } from '../enums/data-url.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Daily } from '../entities/daily.entity';
import { Repository } from 'typeorm';
import { DailyStat } from '../types/daily-stats';
import { EventStat } from '../types/event';
import { Event } from '../entities/event.entity';

const csv = require('csvtojson');

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Daily) private dailyRepository: Repository<Daily>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
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

    await this.dailyRepository.save(mappedDailyStats, { chunk: 100 });
  }

  async importTotalsBySystem() {
    const eventStats: EventStat[] = await this.fetchStats(
      DataUrl.TotalsBySystem,
    );
    const eventItems = eventStats.map((item) => ({
      country: item.country,
      origin: item.origin,
      system: item.system,
      status: item.status,
      url: item.url,
      date: item.date_recorded,
    })) as Event[];

    const eventEntries = await this.eventRepository.find();
    if (eventEntries.length > 0) {
      await this.eventRepository.delete(eventEntries.map((item) => item.id));
    }

    await this.eventRepository.save(eventItems, { chunk: 100 });
  }

  private async fetchStats(url: DataUrl) {
    const response = await fetch(url);
    const data = await response.text();

    return csv().fromString(data);
  }
}
