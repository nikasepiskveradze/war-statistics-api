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
import { ImportService } from '../../services/import.service';

@Injectable()
export class EquipmentsService {
  constructor(
    @InjectRepository(Equipment)
    private equipmentRepository: Repository<Equipment>,
    @InjectRepository(AllEquipment)
    private allEquipmentRepository: Repository<AllEquipment>,
    private importService: ImportService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_1PM)
  async importEquipments() {
    const equipments = await this.importService.fetchStats<IEquipment[]>(
      DataUrl.Equipments,
    );
    const serializedEquipments = equipments.map(serializeEquipments);

    await this.importService.import(
      serializedEquipments,
      this.equipmentRepository,
    );
  }

  @Cron(CronExpression.EVERY_DAY_AT_1PM)
  async importAllEquipments() {
    const allEquipments = await this.importService.fetchStats<IAllEquipment[]>(
      DataUrl.AllEquipments,
    );
    const serializedAllEquipments = allEquipments.map(serializeAllEquipments);

    await this.importService.import(
      serializedAllEquipments,
      this.allEquipmentRepository,
    );
  }
}
