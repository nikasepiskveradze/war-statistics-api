import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { TotalEquipmentsDto } from './dto/total-equipments.dto';
import { Countries } from '../../enums/countries.enum';
import { EquipmentsDto } from './dto/equipments.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Equipments')
@Controller('/api/stats')
export class EquipmentsController {
  constructor(private readonly equipmentsService: EquipmentsService) {}

  @ApiParam({ name: 'country', enum: Countries })
  @Post('/equipments/:country')
  getEquipments(
    @Param('country') country: Countries,
    @Body() body: EquipmentsDto,
  ) {
    return this.equipmentsService.equipments(country, body);
  }

  @Post('/equipments')
  getTotalEquipments(@Body() body: TotalEquipmentsDto) {
    return this.equipmentsService.totalEquipments(body);
  }

  @Get('/equipment-types')
  getEquipmentTypes() {
    return this.equipmentsService.equipmentTypes();
  }
}
