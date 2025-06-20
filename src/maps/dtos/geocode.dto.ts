import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GeocodeDto {
  @ApiProperty({
    description: 'Endereço para geocodificação',
    example: 'Rua das Flores, 123, São Paulo, SP',
  })
  @IsString()
  @IsNotEmpty()
  address: string;
}
