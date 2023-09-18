import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment } from './equipment.entity';
import { Repository } from 'typeorm';
import { AllEquipment } from './all-equipment.entity';
import { DataUrl } from '../../enums/data-url.enum';
import { IEquipment } from './interfaces/equipment.interface';
import { serializeEquipments } from './serializers/equipment.serialize';
import { IAllEquipment } from './interfaces/all-equipment.interface';
import { serializeAllEquipments } from './serializers/all-equipment.serialize';
import { Cron, CronExpression } from '@nestjs/schedule';

const csv = require('csvtojson');

@Injectable()
export class EquipmentsService {
  constructor(
    @InjectRepository(Equipment)
    private equipmentRepository: Repository<Equipment>,
    @InjectRepository(AllEquipment)
    private allEquipmentRepository: Repository<AllEquipment>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_1PM)
  async importEquipments() {
    const equipments = await this.fetchStats<IEquipment[]>(DataUrl.Equipments);
    const serializedEquipments = equipments.map(serializeEquipments);

    const entries = await this.equipmentRepository.find();
    if (entries.length > 0) {
      await this.equipmentRepository.delete(entries.map((entry) => entry.id));
    }

    await this.equipmentRepository.save(serializedEquipments, { chunk: 100 });
  }

  @Cron(CronExpression.EVERY_DAY_AT_1PM)
  async importAllEquipments() {
    const allEquipments = await this.fetchStats<IAllEquipment[]>(
      DataUrl.AllEquipments,
    );
    const serializedAllEquipments = allEquipments.map(serializeAllEquipments);

    const entries = await this.allEquipmentRepository.find();
    if (entries.length > 0) {
      await this.allEquipmentRepository.delete(
        entries.map((entry) => entry.id),
      );
    }

    await this.allEquipmentRepository.save(serializedAllEquipments, {
      chunk: 100,
    });
  }

  private async fetchStats<T>(url: DataUrl) {
    const response = await fetch(url);
    const data = await response.text();

    return csv().fromString(data) as T;
  }
}
