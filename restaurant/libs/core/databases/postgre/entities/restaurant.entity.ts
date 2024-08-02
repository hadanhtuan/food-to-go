import { Check, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Kitchen } from './kitchen.entity';
import { RestaurantStatus } from '@libs/common/enums';

@Entity({ name: 'restaurant' })
@Check(`"open_hour" >= 0 AND "open_hour" < 24`)
@Check(`"close_hour" >= 0 AND "close_hour" < 24`)
export class Restaurant extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'address', type: 'varchar', nullable: false })
  address: string;

  @Column({ name: 'address', type: 'varchar', nullable: false })
  lat: string;

  @Column({ name: 'address', type: 'varchar', nullable: false })
  long: string;

  @Column({ name: 'address', type: 'varchar', nullable: false })
  managerId: string;

  @Column({ name: 'address', type: 'varchar', nullable: false })
  managerName: string;

  @Column({ name: 'number_employees', type: 'bigint', default: 0 })
  numberEmployees: number;

  @Column({ name: 'open_hour', type: 'int', nullable: true })
  openHour: number;

  @Column({ name: 'close_hour', type: 'int', nullable: true })
  closeHour: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: RestaurantStatus,
    default: RestaurantStatus.CLOSE,
  })
  status: RestaurantStatus;

  @OneToMany(() => Kitchen, (kitchen) => kitchen.restaurant, {
    onDelete: 'SET NULL',
  })
  kitchens: Kitchen[];
}
