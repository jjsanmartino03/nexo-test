import {BadRequestException, Injectable, NotFoundException,} from '@nestjs/common';
import {CreatePersonDto} from './dto/create-person.dto';
import {UpdatePersonDto} from './dto/update-person.dto';
import {Person} from './entities/person.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {FindManyOptions, ILike, Repository} from 'typeorm';
import {PersonQueryDto} from './dto/person.query.dto';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}
  async create(createPersonDto: CreatePersonDto) {
    const personExists = await this.personRepository.findOne({
      where: { dni: createPersonDto.dni },
    });

    if (personExists) {
      throw new BadRequestException({
        message: [`La persona con el DNI ${createPersonDto.dni} ya existe`],
      });
    }

    const person = this.personRepository.create(createPersonDto);
    return await this.personRepository.save(person);
  }

  findAll(filters: PersonQueryDto) {
    const where: FindManyOptions<Person>['where'] = {};

    if (filters.dni) {
      where.dni = filters.dni;
    }

    if (filters.nombre) {
      where.nombre = ILike(`%${filters.nombre}%`);
    }

    return this.personRepository.find({
      relations: ['direcciones'],
      where,
    });
  }

  async findOne(dni: number) {
    const person = await this.personRepository.findOne({
      where: { dni },
      relations: ['direcciones'],
    });

    if (!person) {
      throw new NotFoundException({
        message: [`La persona con el DNI ${dni} no existe`],
      });
    }

    return person;
  }

  async update(dni: number, updatePersonDto: UpdatePersonDto) {
    const person = await this.findOne(dni);

    person.nombre = updatePersonDto.nombre;
    person.apellido = updatePersonDto.apellido;
    person.edad = updatePersonDto.edad;
    person.foto = updatePersonDto.foto;

    return this.personRepository.save(person);
  }

  async remove(dni: number) {
    const person = await this.findOne(dni);

    return this.personRepository.remove(person);
  }
}