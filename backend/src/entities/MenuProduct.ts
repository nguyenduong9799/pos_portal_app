import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Menu } from './Menu';
import { Product } from './Product';
import { OrderDetail } from './OrderDetail';

@Index('pk_menu_product_id', ['id'], { unique: true })
@Entity('menu_product', { schema: 'public' })
export class MenuProduct {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'status', length: 20 })
  status: string;

  @Column('double precision', { name: 'selling_price' })
  sellingPrice: number;

  @Column('double precision', { name: 'discount_price' })
  discountPrice: number;

  @Column('double precision', { name: 'historical_price' })
  historicalPrice: number;

  @Column('character varying', {
    name: 'created_by',
    nullable: true,
    length: 50,
  })
  createdBy: string | null;

  @Column('timestamp without time zone', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('character varying', {
    name: 'updated_by',
    nullable: true,
    length: 50,
  })
  updatedBy: string | null;

  @Column('timestamp without time zone', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => Menu, (menu) => menu.menuProducts)
  @JoinColumn([{ name: 'menu_id', referencedColumnName: 'id' }])
  menu: Menu;

  @ManyToOne(() => Product, (product) => product.menuProducts)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.menuProduct)
  orderDetails: OrderDetail[];
}
