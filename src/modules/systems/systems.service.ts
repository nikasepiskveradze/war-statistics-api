import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { System } from './entities/system.entity';
import { Brackets, Repository } from 'typeorm';
import { AllSystem } from './entities/all-system.entity';
import { DataUrl } from '../../enums/data-url.enum';
import { ISystem } from './interfaces/system.interface';
import { serializeSystems } from './serializers/system.serialize';
import { IAllSystem } from './interfaces/all-system.interface';
import { serializeAllSystems } from './serializers/all-system.serialize';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ImportService } from '../../services/import.service';
import { TotalSystemsDto } from './dto/total-systems.dto';
import { Countries } from '../../enums/countries.enum';
import { SystemsDto } from './dto/systems.dto';

@Injectable()
export class SystemsService {
  constructor(
    @InjectRepository(System) private systemRepository: Repository<System>,
    @InjectRepository(AllSystem)
    private allSystemRepository: Repository<AllSystem>,
    private importService: ImportService,
  ) {}

  async systems(country: Countries, { systems, status, date }: SystemsDto) {
    if (!Object.values(Countries).includes(country)) {
      throw new BadRequestException(
        'Please provide ukraine or russia in parameter',
      );
    }

    if (date && date[0] > date[1]) {
      throw new BadRequestException(
        'Start date should be before than End date, please correct',
      );
    }

    const query = this.systemRepository
      .createQueryBuilder()
      .select()
      .where('LOWER(country) = LOWER(:country)', { country });

    if (systems) {
      query.andWhere('system IN (:...systems)', { systems });
    }

    if (status) {
      query.andWhere('status IN (:...status)', { status });
    }

    if (date) {
      query
        .andWhere('date >= :startDate', { startDate: date[0] })
        .andWhere('date <= :endDate', { endDate: date[1] });
    }

    return query.getMany();
  }

  totalSystems({ country, systems }: TotalSystemsDto) {
    const query = this.allSystemRepository.createQueryBuilder().select();

    if (country) {
      query.andWhere('LOWER(country) = LOWER(:country)', { country });
    }

    if (systems) {
      query.andWhere('system IN (:...systems)', { systems });
    }

    return query.getMany();
  }

  systemTypes() {
    return this.allSystemRepository
      .createQueryBuilder('system')
      .select(['system.system'])
      .distinctOn(['system.system'])
      .getMany();
  }

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
