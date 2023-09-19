import { Module } from '@nestjs/common';
import { SystemsService } from './systems.service';
import { SystemsController } from './systems.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { System } from './system.entity';
import { AllSystem } from './all-system.entity';
import { ImportService } from '../../services/import.service';

@Module({
  imports: [TypeOrmModule.forFeature([System, AllSystem])],
  controllers: [SystemsController],
  providers: [SystemsService, ImportService],
  exports: [SystemsService],
})
export class SystemsModule {}