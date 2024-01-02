import {ApiProperty} from '@nestjs/swagger';

export class PersonQueryDto {
  @ApiProperty({
    type: Number,
    description: 'DNI de la persona',
    required: false,
  })
  dni?: number;

  @ApiProperty({
    type: String,
    description: 'Nombre de la persona',
    required: false,
  })
  nombre?: string;

  @ApiProperty({
    type: Number,
    description: 'Edad de la persona',
    required: false,
  })
  edad?: number;
}
