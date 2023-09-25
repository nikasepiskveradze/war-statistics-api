import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Status } from '../../../enums/status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class SystemsDto {
  @ApiProperty({
    default: ['10 KamAZ 4x4', '104 BTR-80'],
  })
  @IsArray()
  @IsOptional()
  systems: string[];

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

  @IsArray()
  @ArrayMaxSize(4)
  @IsOptional()
  status: Status[];
}
