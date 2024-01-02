import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUpdateAddressDto } from './dto/create-update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { Person } from '../people/entities/person.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}
  async create(person: Person, createAddressDto: CreateUpdateAddressDto) {
    const address = this.addressRepository.create(createAddressDto);
    address.persona = person;

    return this.addressRepository.save(address);
  }

  async update(id: number, updateAddressDto: CreateUpdateAddressDto) {
    const savedAddress = await this.addressRepository.findOne({
      where: { id },
    });

    if (!savedAddress) {
      throw new NotFoundException({
        message: [`La dirección con el ID ${id} no existe`],
      });
    }

    savedAddress.calle = updateAddressDto.calle;
    savedAddress.numero = updateAddressDto.numero;
    savedAddress.ciudad = updateAddressDto.ciudad;

    return this.addressRepository.save(savedAddress);
  }

  async remove(id: number) {
    const savedAddress = await this.addressRepository.findOne({
      where: { id },
      relations: {
        persona: {
          direcciones: true,
        },
      },
    });

    if (!savedAddress) {
      throw new NotFoundException({
        message: [`La dirección con el ID ${id} no existe`],
      });
    }

    if (savedAddress.persona.direcciones.length === 1) {
      throw new BadRequestException({
        message: [
          `La persona con el DNI ${savedAddress.persona.dni} debe tener al menos una dirección`,
        ],
      });
    }

    const result = await this.addressRepository.remove(savedAddress);

    return {
      ...result,
      persona: undefined,
    };
  }
}
