import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsOptional,
} from 'class-validator';
import { EquipmentType } from '../../../enums/equipment-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class EquipmentsDto {
  @ApiProperty({
    default: ['Tanks'],
  })
  @IsArray()
  @IsOptional()
  types: EquipmentType[];

  @ApiProperty({
    description:
      'First item in array is start date and second is end date, format is string YYYY-MM-DD',
    default: ['2022-11-10', '2023-06-24'],
  })
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsOptional()
  date: string[];
}
