import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { CreateUpdateAddressDto } from '../address/dto/create-update-address.dto';
import { AddressService } from '../address/address.service';
import { PersonQueryDto } from './dto/person.query.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('personas')
@ApiTags('Personas')
export class PeopleController {
  constructor(
    private readonly peopleService: PeopleService,
    private readonly addressService: AddressService,
  ) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Obtener todas las personas con sus direcciones' })
  findAll(@Query() query: PersonQueryDto) {
    return this.peopleService.findAll(query);
  }

  @Get(':dni')
  @ApiOperation({ summary: 'Obtener una persona con sus direcciones' })
  findOne(@Param('dni') dni: string) {
    return this.peopleService.findOne(+dni);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una persona' })
  async create(@Body() createPersonDto: CreatePersonDto) {
    return await this.peopleService.create(createPersonDto);
  }

  @Post(':dni/direcciones')
  @ApiOperation({ summary: 'Agregar una dirección a una persona' })
  async addAddress(
    @Param('dni') dni: string,
    @Body() address: CreateUpdateAddressDto,
  ) {
    const person = await this.peopleService.findOne(+dni);

    return this.addressService.create(person, address);
  }

  @Put(':dni')
  @ApiOperation({ summary: 'Actualizar datos de una persona' })
  update(@Param('dni') dni: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.peopleService.update(+dni, updatePersonDto);
  }

  @Delete(':dni')
  @ApiOperation({ summary: 'Eliminar una persona y sus direcciones asociadas' })
  remove(@Param('dni') dni: string) {
    return this.peopleService.remove(+dni);
  }

  @Get('/export/csv')
  @ApiOperation({ summary: 'Exportar datos de todas las personas a un CSV' })
  async exportPeopleToCSV(@Res() response: Response) {
    const csvData = await this.peopleService.generateCSVData();

    response.setHeader('Content-Type', 'text/csv');
    response.setHeader(
      'Content-Disposition',
      'attachment; filename="personas.csv"',
    );

    response.send(csvData);
  }
}
