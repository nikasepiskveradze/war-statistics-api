import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Status } from '../../../enums/status.enum';

export class SystemsDto {
  @IsArray()
  @IsOptional()
  systems: string[];

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
