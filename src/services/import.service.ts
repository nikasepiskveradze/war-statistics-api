import { Injectable } from '@nestjs/common';
import { Equipment } from '../modules/equipments/equipment.entity';
import { AllEquipment } from '../modules/equipments/all-equipment.entity';
import { Repository } from 'typeorm';
import { DataUrl } from '../enums/data-url.enum';
import { System } from '../modules/systems/system.entity';
import { AllSystem } from '../modules/systems/all-system.entity';
const csv = require('csvtojson');

@Injectable()
export class ImportService {
  async import<
    T extends
      | Partial<Equipment>
      | Partial<AllEquipment>
      | Partial<System>
      | Partial<AllSystem>,
  >(elements: T[], repository: Repository<T>) {
    const entries = await repository.find();
    if (entries.length > 0) {
      await repository.delete(entries.map((entry) => entry.id));
    }

    await repository.save(elements, {
      chunk: 100,
    });
  }

  async fetchStats<T>(url: DataUrl) {
    const response = await fetch(url);
    const data = await response.text();

    return csv().fromString(data) as T;
  }
}
