import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsOptional,
} from 'class-validator';
import { EquipmentType } from '../../../enums/equipment-type.enum';

export class EquipmentsDto {
  @IsArray()
  @IsOptional()
  type: EquipmentType[];

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsOptional()
  date: string[];
}
