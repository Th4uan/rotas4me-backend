import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';
import { MarkerType } from '../enums/marker.enum';

@Entity({ name: 'markers' })
export class MarkerEntity extends BaseEntity {
  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  @Column({ enum: MarkerType })
  type: MarkerType;

  @Column({ type: 'varchar', nullable: true })
  name: string;
}
