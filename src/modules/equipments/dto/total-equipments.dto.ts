import { IsArray, IsOptional, IsString } from 'class-validator';
import { Countries } from '../../../enums/countries.enum';
import { EquipmentType } from '../../../enums/equipment-type.enum';

export class TotalEquipmentsDto {
  @IsString()
  @IsOptional()
  country: Countries;

  @IsArray()
  @IsOptional()
  type: EquipmentType[];
}
