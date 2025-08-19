import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Brand } from './Brand';
import { Store } from './Store';
import { ExtraCategory } from './ExtraCategory';
import { Product } from './Product';

@Index('idx_category_brand_id', ['brandId'], {})
@Index('ux_category_code', ['code'], { unique: true })
@Index('pk_category_id', ['id'], { unique: true })
@Entity('category', { schema: 'public' })
export class Category {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'code', length: 20 })
  code: string;

  @Column('character varying', { name: 'name', length: 50 })
  name: string;

  @Column('character varying', { name: 'type', length: 20 })
  type: string;

  @Column('integer', { name: 'display_order' })
  displayOrder: number;

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 100,
  })
  description: string | null;

  @Column('text', { name: 'pic_url', nullable: true })
  picUrl: string | null;

  @Column('character varying', { name: 'status', length: 20 })
  status: string;

  @Column('uuid', { name: 'brand_id', nullable: true })
  brandId: string | null;

  @ManyToOne(() => Brand, (brand) => brand.categories)
  @JoinColumn([{ name: 'brand_id', referencedColumnName: 'id' }])
  brand: Brand;

  @ManyToMany(() => Store, (store) => store.categories)
  @JoinTable({
    name: 'category_store_mapping',
    joinColumns: [{ name: 'category_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'store_id', referencedColumnName: 'id' }],
    schema: 'public',
  })
  stores: Store[];

  @OneToMany(
    () => ExtraCategory,
    (extraCategory) => extraCategory.extraCategory,
  )
  extraCategories: ExtraCategory[];

  @OneToMany(
    () => ExtraCategory,
    (extraCategory) => extraCategory.productCategory,
  )
  extraCategories2: ExtraCategory[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
