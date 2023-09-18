import { Controller } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';

@Controller('stats/equipments')
export class EquipmentsController {
  constructor(private readonly equipmentsService: EquipmentsService) {}
}
