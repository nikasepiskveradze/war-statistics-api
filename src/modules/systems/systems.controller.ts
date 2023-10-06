import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SystemsService } from './systems.service';
import { TotalSystemsDto } from './dto/total-systems.dto';
import { Countries } from '../../enums/countries.enum';
import { SystemsDto } from './dto/systems.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Systems')
@Controller('/api/stats')
export class SystemsController {
  constructor(private readonly systemsService: SystemsService) {}

  @ApiParam({ name: 'country', enum: Countries })
  @Post('/systems/:country')
  getSystems(@Param('country') country: Countries, @Body() body: SystemsDto) {
    return this.systemsService.systems(country, body);
  }

  @Post('/systems')
  getTotalSystems(@Body() body: TotalSystemsDto) {
    return this.systemsService.totalSystems(body);
  }

  @Get('/system-types')
  getSystemTypes() {
    return this.systemsService.systemTypes();
  }
}
