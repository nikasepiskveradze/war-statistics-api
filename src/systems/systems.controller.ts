import { Controller } from '@nestjs/common';
import { SystemsService } from './systems.service';

@Controller('stats/systems')
export class SystemsController {
  constructor(private readonly systemsService: SystemsService) {}
}
