import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Product } from './Product';
import { ProductInGroup } from './ProductInGroup';

@Index('pk__group_pro__3214ec0705d5cb61', ['id'], { unique: true })
@Entity('group_product', { schema: 'public' })
export class GroupProduct {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', {
    name: 'name',
    length: 50,
    default: () => "''",
  })
  name: string;

  @Column('character varying', {
    name: 'combination_mode',
    length: 30,
    default: () => "''",
  })
  combinationMode: string;

  @Column('integer', { name: 'priority', default: () => '0' })
  priority: number;

  @Column('integer', { name: 'quantity', default: () => '0' })
  quantity: number;

  @Column('character varying', { name: 'status', length: 20 })
  status: string;

  @ManyToOne(() => Product, (product) => product.groupProducts)
  @JoinColumn([{ name: 'combo_product_id', referencedColumnName: 'id' }])
  comboProduct: Product;

  @OneToMany(
    () => ProductInGroup,
    (productInGroup) => productInGroup.groupProduct,
  )
  productInGroups: ProductInGroup[];
}
