import { IImage } from '@libs/common/interfaces/image.interface';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Kitchen } from './kitchen.entity';

@Entity({ name: 'dish' })
export class Dish extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'price', type: 'bigint', default: 0 })
  price: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'time_to_make', type: 'int' })
  timeToMake: number; // minutes

  @Column({ name: 'image', type: 'jsonb' })
  image: IImage;

  @ManyToOne(() => Kitchen, (kitchen) => kitchen.dishes, {
    onDelete: 'SET NULL',
  })
  kitchen: Kitchen;
}
