import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';
import { ContatoEmergencia } from '../interfaces/contato-emergencia.interface';

@Entity()
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  nome: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'float', nullable: true })
  lat?: number;

  @Column({ type: 'float', nullable: true })
  lng?: number;

  @Column({ nullable: true })
  endereco?: string;

  @Column({ nullable: true })
  cidade?: string;

  @Column({ nullable: true })
  estado?: string;

  @Column({ nullable: true })
  telefone?: string;

  @Column({ type: 'json', nullable: true })
  contatosEmergencia?: ContatoEmergencia[];

  @Column({ default: false })
  notificacoesSeguranca: boolean;

  @Column({ default: false })
  compartilharLocalizacao: boolean;
}
