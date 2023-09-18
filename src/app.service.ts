import { Injectable } from '@nestjs/common';
import { EquipmentsService } from './modules/equipments/equipments.service';
import { SystemsService } from './modules/systems/systems.service';

@Injectable()
export class AppService {
  constructor(
    private equipmentsService: EquipmentsService,
    private systemsService: SystemsService,
  ) {}

  async onApplicationBootstrap() {
    await this.equipmentsService.importEquipments();
    await this.equipmentsService.importAllEquipments();
    await this.systemsService.importSystems();
    await this.systemsService.importAllSystems();
  }
}
