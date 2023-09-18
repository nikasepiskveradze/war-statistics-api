import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { System } from './system.entity';
import { Repository } from 'typeorm';
import { AllSystem } from './all-system.entity';
import { DataUrl } from '../enums/data-url.enum';
import { ISystem } from './interfaces/system.interface';
import { serializeSystems } from './serializers/system.serialize';
import { IAllSystem } from './interfaces/all-system.interface';
import { serializeAllSystems } from './serializers/all-system.serialize';

const csv = require('csvtojson');

@Injectable()
export class SystemsService {
  constructor(
    @InjectRepository(System) private systemRepository: Repository<System>,
    @InjectRepository(AllSystem)
    private allSystemRepository: Repository<AllSystem>,
  ) {}

  async importSystems() {
    const systems = await this.fetchStats<ISystem[]>(DataUrl.Systems);
    const serializedSystems = systems.map(serializeSystems);

    const entries = await this.systemRepository.find();
    if (entries.length > 0) {
      await this.systemRepository.delete(entries.map((entry) => entry.id));
    }

    await this.systemRepository.save(serializedSystems, { chunk: 100 });
  }

  async importAllSystems() {
    const allSystems = await this.fetchStats<IAllSystem[]>(DataUrl.AllSystems);
    const serializedAllSystems = allSystems.map(serializeAllSystems);

    const entries = await this.allSystemRepository.find();
    if (entries.length > 0) {
      await this.allSystemRepository.delete(entries.map((entry) => entry.id));
    }

    await this.allSystemRepository.save(serializedAllSystems, { chunk: 100 });
  }

  private async fetchStats<T>(url: DataUrl) {
    const response = await fetch(url);
    const data = await response.text();

    return csv().fromString(data) as T;
  }
}
