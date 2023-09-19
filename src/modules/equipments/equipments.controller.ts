import { Body, Controller, Get, Param } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { TotalEquipmentsDto } from './dto/total-equipments.dto';
import { Countries } from '../../enums/countries.enum';
import { EquipmentsDto } from './dto/equipments.dto';

@Controller()
export class EquipmentsController {
  constructor(private readonly equipmentsService: EquipmentsService) {}

  @Get('/stats/equipments/:country')
  getEquipments(
    @Param('country') country: Countries,
    @Body() body: EquipmentsDto,
  ) {
    return this.equipmentsService.equipments(country, body);
  }

  @Get('/stats/equipments')
  getTotalEquipments(@Body() body: TotalEquipmentsDto) {
    return this.equipmentsService.totalEquipments(body);
  }

  @Get('/stats/equipment-types')
  getEquipmentTypes() {
    return this.equipmentsService.equipmentTypes();
  }
}
