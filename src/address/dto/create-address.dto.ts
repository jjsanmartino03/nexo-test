import {ApiProperty} from '@nestjs/swagger';
import {IsDefined, IsNumber, IsString} from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    description: 'Calle de la dirección',
    example: 'Av. Siempre Viva',
    type: String,
  })
  @IsDefined({ message: 'La calle es requerida' })
  @IsString({ message: 'La calle debe ser un string' })
  calle: string;

  @ApiProperty({
    description: 'Número de la dirección',
    example: '123',
    type: Number,
  })
  @IsDefined({ message: 'El número es requerido' })
  @IsNumber({}, { message: 'El número debe ser un número' })
  numero: number;

  @ApiProperty({
    description: 'Ciudad de la dirección',
    example: 'Springfield',
    type: String,
  })
  @IsDefined({ message: 'La ciudad es requerida' })
  @IsString({ message: 'La ciudad debe ser un string' })
  ciudad: string;
}
