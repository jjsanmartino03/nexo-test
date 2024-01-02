import {Column, Entity, OneToMany, PrimaryColumn} from 'typeorm';
import {Address} from '../../address/entities/address.entity';

@Entity()
export class Person {
  @PrimaryColumn({ type: 'int' })
  dni: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ type: 'int' })
  edad: number;

  @Column()
  foto: string;

  @OneToMany(() => Address, (address) => address.persona, {
    cascade: true,
  })
  direcciones: Address[];
}
