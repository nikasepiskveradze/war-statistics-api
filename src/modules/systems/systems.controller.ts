import { Body, Controller, Get, Param } from '@nestjs/common';
import { SystemsService } from './systems.service';
import { TotalSystemsDto } from './dto/total-systems.dto';
import { Countries } from '../../enums/countries.enum';
import { SystemsDto } from './dto/systems.dto';

@Controller()
export class SystemsController {
  constructor(private readonly systemsService: SystemsService) {}

  @Get('/stats/systems/:country')
  getSystems(@Param('country') country: Countries, @Body() body: SystemsDto) {
    return this.systemsService.systems(country, body);
  }

  @Get('/stats/systems')
  getTotalSystems(@Body() body: TotalSystemsDto) {
    return this.systemsService.totalSystems(body);
  }

  @Get('/stats/system-types')
  getSystemTypes() {
    return this.systemsService.systemTypes();
  }
}
