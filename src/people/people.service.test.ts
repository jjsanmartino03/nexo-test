import { Test, TestingModule } from '@nestjs/testing';
import { PeopleService } from './people.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { ILike, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const dummyPerson = {
  dni: 34567851,
  nombre: 'Pablo',
  apellido: 'Sanmartino',
  edad: 20,
  foto: 'https://www.google.com',
  direcciones: [],
};

describe('PeopleService', () => {
  let service: PeopleService;
  let repository: Repository<Person>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeopleService,
        {
          provide: getRepositoryToken(Person),
          useValue: {
            find: jest.fn().mockResolvedValue([dummyPerson]),
            findOne: jest.fn().mockResolvedValue(dummyPerson),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PeopleService>(PeopleService);
    repository = module.get<Repository<Person>>(getRepositoryToken(Person));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return array of people', async () => {
    const people = await service.findAll({});

    expect(repository.find).toHaveBeenCalledTimes(1);
    expect(people).toEqual([dummyPerson]);
  });

  it('should apply filters when finding all the people', async () => {
    await service.findAll({
      nombre: 'juan',
      edad: 20,
      dni: 12345678,
    });

    expect(repository.find).toHaveBeenCalledWith({
      where: {
        nombre: ILike('%juan%'),
        edad: 20,
        dni: 12345678,
      },
      relations: ['direcciones'],
    });
  });

  it('should return one person', async () => {
    const person = await service.findOne(34567851);

    expect(repository.findOne).toHaveBeenCalledTimes(1);
    expect(person).toEqual(dummyPerson);
  });

  it('should throw error if no person is found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrowError(NotFoundException);
  });

  it('should create a person', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    await service.create(dummyPerson);

    expect(repository.create).toHaveBeenCalledWith(dummyPerson);
    expect(repository.save).toHaveBeenCalledTimes(1);
  });

  it('should update a person', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(dummyPerson);
    const updatedObject = {
      ...dummyPerson,
      nombre: 'Pedro',
    };
    const updatedPerson = new Person();
    updatedPerson.nombre = 'Pedro';
    updatedPerson.apellido = dummyPerson.apellido;
    updatedPerson.edad = dummyPerson.edad;
    updatedPerson.foto = dummyPerson.foto;
    updatedPerson.dni = dummyPerson.dni;
    updatedPerson.direcciones = dummyPerson.direcciones;

    await service.update(dummyPerson.dni, updatedObject);

    expect(repository.save).toHaveBeenCalledWith(updatedPerson);
  });

  it('should remove a person', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(dummyPerson);
    await service.remove(dummyPerson.dni);

    expect(repository.findOne).toHaveBeenCalledTimes(1);
    expect(repository.remove).toHaveBeenCalledTimes(1);
  });

  it('should throw error if no person is found when deleting', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(service.remove(1)).rejects.toThrowError(NotFoundException);
  });

  it('should generate CSV data correctly', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue([dummyPerson]);
    const csvData = await service.generateCSVData();

    expect(csvData).toEqual(
      `DNI,Nombre,Apellido,Edad,Foto,Direcciones\n34567851,${dummyPerson.nombre},${dummyPerson.apellido},${dummyPerson.edad},${dummyPerson.foto},\n`,
    );
  });
});
