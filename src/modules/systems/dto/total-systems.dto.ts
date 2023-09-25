import { IsArray, IsOptional, IsString } from 'class-validator';
import { Countries } from '../../../enums/countries.enum';
import { ApiProperty } from '@nestjs/swagger';

export class TotalSystemsDto {
  @ApiProperty({ enum: Countries })
  @IsString()
  @IsOptional()
  country: Countries;

  @ApiProperty({
    description: 'Pick systems once you fetch all systems list',
    default: ['10 KamAZ 4x4', '104 BTR-80'],
  })
  @IsArray()
  @IsOptional()
  systems: string[];
}
