import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { System } from './entities/system.entity';
import { Repository } from 'typeorm';
import { AllSystem } from './entities/all-system.entity';
import { DataUrl } from '../../enums/data-url.enum';
import { ISystem } from './interfaces/system.interface';
import { serializeSystems } from './serializers/system.serialize';
import { IAllSystem } from './interfaces/all-system.interface';
import { serializeAllSystems } from './serializers/all-system.serialize';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ImportService } from '../../services/import.service';

@Injectable()
export class SystemsService {
  constructor(
    @InjectRepository(System) private systemRepository: Repository<System>,
    @InjectRepository(AllSystem)
    private allSystemRepository: Repository<AllSystem>,
    private importService: ImportService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_1PM)
  async importSystems() {
    const systems = await this.importService.fetchStats<ISystem[]>(
      DataUrl.Systems,
    );
    const serializedSystems = systems.map(serializeSystems);

    await this.importService.import(serializedSystems, this.systemRepository);
  }

  @Cron(CronExpression.EVERY_DAY_AT_1PM)
  async importAllSystems() {
    const allSystems = await this.importService.fetchStats<IAllSystem[]>(
      DataUrl.AllSystems,
    );
    const serializedAllSystems = allSystems.map(serializeAllSystems);

    await this.importService.import(
      serializedAllSystems,
      this.allSystemRepository,
    );
  }
}
