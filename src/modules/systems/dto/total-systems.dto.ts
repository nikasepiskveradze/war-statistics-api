import { IsArray, IsOptional, IsString } from 'class-validator';
import { Countries } from '../../../enums/countries.enum';

export class TotalSystemsDto {
  @IsString()
  @IsOptional()
  country: Countries;

  @IsArray()
  @IsOptional()
  systems: string[];
}
