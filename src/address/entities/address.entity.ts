import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Person} from '../../people/entities/person.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  calle: string;

  @Column()
  numero: number;

  @Column()
  ciudad: string;

  @ManyToOne(() => Person, (persona) => persona.direcciones, {
    onDelete: 'CASCADE',
  })
  persona: Person;
}
