import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';
import { MarkerType } from '../enums/marker.enum';

@Entity({ name: 'markers' })
export class MarkerEntity extends BaseEntity {
  @Column({ type: 'double' })
  latitude: number;

  @Column({ type: 'double' })
  longitude: number;

  @Column({ enum: MarkerType })
  type: MarkerType;

  @Column({ type: 'varchar', nullable: true })
  name: string;
}
