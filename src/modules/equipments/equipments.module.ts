import { Module } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { EquipmentsController } from './equipments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment } from './entities/equipment.entity';
import { AllEquipment } from './entities/all-equipment.entity';
import { ImportService } from '../../services/import.service';

@Module({
  imports: [TypeOrmModule.forFeature([Equipment, AllEquipment])],
  controllers: [EquipmentsController],
  providers: [EquipmentsService, ImportService],
  exports: [EquipmentsService],
})
export class EquipmentsModule {}
