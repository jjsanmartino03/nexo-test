import {
  IsDefined,
  IsNumber,
  IsString,
  IsUrl,
  Length,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUpdateAddressDto } from '../../address/dto/create-update-address.dto';
import { Type } from 'class-transformer';

export class CreatePersonDto {
  @ApiProperty({
    description: 'DNI de la persona',
    example: '34567832',
    type: Number,
  })
  @IsDefined({ message: 'El DNI es requerido' })
  @IsNumber({}, { message: 'El DNI debe ser un número' })
  @Min(1, { message: 'El DNI debe ser mayor a 0' })
  dni: number;

  @ApiProperty({
    description: 'Nombre de la persona',
    example: 'Juan',
    type: String,
  })
  @IsDefined({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser un string' })
  @Length(3, 20, { message: 'El nombre debe tener entre 3 y 20 caracteres' })
  nombre: string;

  @ApiProperty({
    description: 'Apellido de la persona',
    example: 'Perez',
    type: String,
  })
  @IsDefined({ message: 'El apellido es requerido' })
  @IsString({ message: 'El apellido debe ser un string' })
  @Length(3, 20, { message: 'El apellido debe tener entre 3 y 20 caracteres' })
  apellido: string;

  @ApiProperty({
    description: 'Edad de la persona',
    example: '20',
    type: Number,
  })
  @IsDefined({ message: 'La edad es requerida' })
  @IsNumber({}, { message: 'La edad debe ser un número' })
  @Min(1, { message: 'La edad debe ser mayor a 0' })
  edad: number;

  @ApiProperty({
    description: 'URL de la foto de la persona',
    type: String,
    example:
      'https://res.cloudinary.com/dyz4ycir1/image/upload/v1704231094/ewykl1lghi8yvmssripl.jpg',
  })
  @IsUrl({}, { message: 'La foto debe ser una URL' })
  @IsDefined({ message: 'La foto es requerida' })
  @IsString({ message: 'La foto debe ser un string' })
  foto: string;

  @ApiProperty({
    description: 'Direcciones de la persona',
    type: [CreateUpdateAddressDto],
    example: [
      { calle: 'Aristóbulo del Valle', numero: 1578, ciudad: 'San Francisco' },
    ],
  })
  @IsDefined({ message: 'Las direcciones son requeridas' })
  @ValidateNested({ each: true, message: 'Las direcciones deben ser válidas' })
  @Type(() => CreateUpdateAddressDto)
  @MinLength(1, { message: 'Debe tener al menos una dirección' })
  direcciones: CreateUpdateAddressDto[];
}
