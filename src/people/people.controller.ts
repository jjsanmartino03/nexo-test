import {
  Body,
  Controller,
  Delete,
  Get,
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
import { ApiTags } from '@nestjs/swagger';

@Controller('personas')
@ApiTags('Personas')
export class PeopleController {
  constructor(
    private readonly peopleService: PeopleService,
    private readonly addressService: AddressService,
  ) {}

  @Get()
  findAll(@Query() query: PersonQueryDto) {
    return this.peopleService.findAll(query);
  }

  @Get(':dni')
  findOne(@Param('dni') dni: string) {
    return this.peopleService.findOne(+dni);
  }

  @Post()
  async create(@Body() createPersonDto: CreatePersonDto) {
    return await this.peopleService.create(createPersonDto);
  }

  @Post(':dni/direcciones')
  async addAddress(
    @Param('dni') dni: string,
    @Body() address: CreateUpdateAddressDto,
  ) {
    const person = await this.peopleService.findOne(+dni);

    return this.addressService.create(person, address);
  }

  @Put(':dni')
  update(@Param('dni') dni: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.peopleService.update(+dni, updatePersonDto);
  }

  @Delete(':dni')
  remove(@Param('dni') dni: string) {
    return this.peopleService.remove(+dni);
  }

  @Get('/export/csv')
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
