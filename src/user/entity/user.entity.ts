import { BaseEntity, Column, Entity } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @Column()
  nome: string;

  @Column()
  email: string;
}
