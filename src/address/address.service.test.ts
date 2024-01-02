import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from './address.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Person } from '../people/entities/person.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const dummyAddress = {
  id: 1,
  calle: 'Aristóbulo del Valle',
  numero: 2356,
  ciudad: 'San Francisco',
};
describe('AddressService', () => {
  let service: AddressService;
  let repository: Repository<Address>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: getRepositoryToken(Address),
          useValue: {
            remove: jest.fn(),
            update: jest.fn(),
            save: jest.fn(),
            create: jest.fn(() => new Address()),
            findOne: jest.fn().mockResolvedValue(dummyAddress),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    repository = module.get<Repository<Address>>(getRepositoryToken(Address));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an address', async () => {
    const person = new Person();

    person.dni = 34567851;
    person.nombre = 'Pablo';
    person.apellido = 'Sanmartino';
    person.edad = 20;
    person.foto = 'https://www.google.com';
    person.direcciones = [];

    await service.create(person, dummyAddress);

    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.create).toHaveBeenCalledWith(dummyAddress);
    expect(repository.save).toHaveBeenCalledTimes(1);
  });

  it('should update an address', async () => {
    const updatedAddressObject = {
      calle: 'Almafuerte',
      numero: 2356,
      ciudad: 'Devoto',
    };

    const updatedAddress = new Address();
    updatedAddress.id = dummyAddress.id;
    updatedAddress.calle = updatedAddressObject.calle;
    updatedAddress.numero = updatedAddressObject.numero;
    updatedAddress.ciudad = updatedAddressObject.ciudad;

    await service.update(1, updatedAddress);

    expect(repository.save).toHaveBeenCalledWith(updatedAddress);
  });

  it('should fail when trying to update an address that does not exist', async () => {
    repository.findOne = jest.fn().mockResolvedValue(null);
    await expect(
      service.update(dummyAddress.id, dummyAddress),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should delete an address', async () => {
    const persona = {
      dni: 34567851,
      nombre: 'Pablo',
      apellido: 'Sanmartino',
      edad: 20,
      foto: 'https://githubusercontent.com/u/59868273?v=4',
      direcciones: [new Address(), new Address()],
    };
    jest.spyOn(repository, 'findOne').mockResolvedValue({
      ...dummyAddress,
      persona,
    });

    await service.remove(1);
    const address = new Address();

    address.id = dummyAddress.id;
    address.calle = dummyAddress.calle;
    address.numero = dummyAddress.numero;
    address.ciudad = dummyAddress.ciudad;
    address.persona = persona;

    expect(repository.remove).toHaveBeenCalledTimes(1);
    expect(repository.remove).toHaveBeenCalledWith(address);
  });

  it('should fail when trying to delete an address that does not exist', async () => {
    repository.findOne = jest.fn().mockResolvedValue(null);

    await expect(service.remove(1)).rejects.toThrowError(NotFoundException);
  });
});
