import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Dish } from './dish.entity';
import { Restaurant } from './restaurant.entity';

@Entity({ name: 'kitchen' })
export class Kitchen extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @OneToMany(() => Dish, (dish) => dish.kitchen, {
    onDelete: 'SET NULL',
  })
  dishes: Dish[];

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.kitchens, {
    onDelete: 'SET NULL',
  })
  restaurant: Restaurant;
}
