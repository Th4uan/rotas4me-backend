import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { MarkerType } from '../../enums/marker.enum';

export class GetMarkersByTypeDto {
  @ApiProperty({
    description: 'Tipos de marcadores para filtrar',
    enum: MarkerType,
    isArray: true,
    example: [MarkerType.SAFE_SPOT, MarkerType.POLICE_STATION],
  })
  @IsArray()
  @IsEnum(MarkerType, { each: true })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',');
    }
    return value as MarkerType[];
  })
  types: MarkerType[];
}
