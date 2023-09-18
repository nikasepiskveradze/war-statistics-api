import { Injectable } from '@nestjs/common';
import { EquipmentsService } from './equipments/equipments.service';
import { SystemsService } from './systems/systems.service';

@Injectable()
export class AppService {
  constructor(
    private equipmentsService: EquipmentsService,
    private systemsService: SystemsService,
  ) {}

  async onApplicationBootstrap() {}
}
