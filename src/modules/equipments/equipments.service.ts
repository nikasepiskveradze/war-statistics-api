import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment } from './entities/equipment.entity';
import { Repository } from 'typeorm';
import { AllEquipment } from './entities/all-equipment.entity';
import { DataUrl } from '../../enums/data-url.enum';
import { IEquipment } from './interfaces/equipment.interface';
import { serializeEquipments } from './serializers/equipment.serialize';
import { IAllEquipment } from './interfaces/all-equipment.interface';
import { serializeAllEquipments } from './serializers/all-equipment.serialize';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ImportService } from '../../utils/import.service';
import { TotalEquipmentsDto } from './dto/total-equipments.dto';
import { Countries } from '../../enums/countries.enum';
import { EquipmentsDto } from './dto/equipments.dto';

@Injectable()
export class EquipmentsService {
  constructor(
    @InjectRepository(Equipment)
    private equipmentRepository: Repository<Equipment>,
    @InjectRepository(AllEquipment)
    private allEquipmentRepository: Repository<AllEquipment>,
    private importService: ImportService,
  ) {}

  equipments(country: Countries, { types, date }: EquipmentsDto) {
    if (!!Object.values(Countries).includes(country)) {
      throw new BadRequestException(
        'Please provide ukraine or russia in parameter',
      );
    }

    const query = this.equipmentRepository
      .createQueryBuilder()
      .select()
      .where('LOWER(country) = LOWER(:country)', { country });

    if (types) {
      query.andWhere('type IN (:...types)', { types });
    }

    if (date && date[0] > date[1]) {
      throw new BadRequestException(
        'Start date should be before than End date, please correct',
      );
    }

    if (date) {
      query
        .andWhere('date >= :startDate', { startDate: date[0] })
        .andWhere('date <= :endDate', { endDate: date[1] });
    }

    return query.getMany();
  }

  totalEquipments({ country, types }: TotalEquipmentsDto) {
    const query = this.allEquipmentRepository.createQueryBuilder().select();

    if (country) {
      query.andWhere('LOWER(country) = LOWER(:country)', { country });
    }
    if (types) {
      query.andWhere('type IN (:...types)', { types });
    }

    return query.orderBy('country', 'ASC').addOrderBy('type').getMany();
  }

  equipmentTypes() {
    return this.allEquipmentRepository
      .createQueryBuilder('equipment')
      .select(['equipment.type'])
      .andWhere('LOWER(country) = LOWER(:country)', {
        country: Countries.Ukraine,
      })
      .orderBy('type', 'ASC')
      .getMany();
  }

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
