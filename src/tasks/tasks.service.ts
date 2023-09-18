import { Injectable } from '@nestjs/common';
import { DataUrl } from '../enums/data-url.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Daily } from '../entities/daily.entity';
import { Repository } from 'typeorm';
import { DailyStat } from '../types/daily-stats';
import { EventStat } from '../types/event';
import { Event } from '../entities/event.entity';
import { SystemWideStat } from '../types/system-wide';
import { SystemWide } from '../entities/system-wide.entity';
import { TypeStat } from '../types/type-stat';
import { TotalsType } from '../entities/totals-type.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

const csv = require('csvtojson');

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Daily) private dailyRepository: Repository<Daily>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(SystemWide)
    private systemWideRepository: Repository<SystemWide>,
    @InjectRepository(TotalsType)
    private totalsTypeRepository: Repository<TotalsType>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_1PM)
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

  @Cron(CronExpression.EVERY_DAY_AT_1PM)
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

  @Cron(CronExpression.EVERY_DAY_AT_1PM)
  async importTotalBySystemWide() {
    const systemWideStats: SystemWideStat[] = await this.fetchStats(
      DataUrl.TotalsBySystemWide,
    );

    const systemWideItems = systemWideStats.map((item) => ({
      ...item,
      destroyed: parseInt(item.destroyed),
      captured: parseInt(item.captured),
      abandoned: parseInt(item.abandoned),
      damaged: parseInt(item.damaged),
      total: parseInt(item.total),
    })) as SystemWide[];

    const systemEntries = await this.systemWideRepository.find();
    if (systemEntries.length > 0) {
      await this.systemWideRepository.delete(
        systemEntries.map((item) => item.id),
      );
    }

    await this.systemWideRepository.save(systemWideItems, { chunk: 100 });
  }

  @Cron(CronExpression.EVERY_DAY_AT_1PM)
  async importTotalsByType() {
    const typeStats: TypeStat[] = await this.fetchStats(DataUrl.TotalByType);

    const typeItems = typeStats.map((item) => ({
      country: item.country,
      type: item.equipment_type,
      destroyed: parseInt(item.destroyed),
      abandoned: parseInt(item.abandoned),
      captured: parseInt(item.captured),
      damaged: parseInt(item.damaged),
      total: parseInt(item.type_total),
    })) as TotalsType[];

    const typeEntries = await this.totalsTypeRepository.find();
    if (typeEntries.length > 0) {
      await this.totalsTypeRepository.delete(
        typeEntries.map((item) => item.id),
      );
    }

    await this.totalsTypeRepository.save(typeItems, { chunk: 100 });
  }

  private async fetchStats(url: DataUrl) {
    const response = await fetch(url);
    const data = await response.text();

    return csv().fromString(data);
  }
}
