import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CollectionProduct } from './CollectionProduct';
import { GroupProduct } from './GroupProduct';
import { MenuProduct } from './MenuProduct';
import { Brand } from './Brand';
import { Category } from './Category';
import { ProductInGroup } from './ProductInGroup';
import { PromotionProductMapping } from './PromotionProductMapping';
import { VariantProductMapping } from './VariantProductMapping';

@Index('idx_product_brand_id', ['brandId'], {})
@Index('idx_product_category_id', ['categoryId'], {})
@Index('ux_product_code', ['code'], { unique: true })
@Index('pk_product_id', ['id'], { unique: true })
@Index('idx_product_parent_product_id', ['parentProductId'], {})
@Entity('product', { schema: 'public' })
export class Product {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'code', length: 20 })
  code: string;

  @Column('character varying', { name: 'name', length: 100 })
  name: string;

  @Column('double precision', { name: 'selling_price' })
  sellingPrice: number;

  @Column('text', { name: 'pic_url', nullable: true })
  picUrl: string | null;

  @Column('character varying', { name: 'status', length: 20 })
  status: string;

  @Column('double precision', { name: 'historical_price' })
  historicalPrice: number;

  @Column('double precision', { name: 'discount_price' })
  discountPrice: number;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('integer', { name: 'display_order' })
  displayOrder: number;

  @Column('character varying', { name: 'size', nullable: true, length: 10 })
  size: string | null;

  @Column('character varying', { name: 'type', length: 15 })
  type: string;

  @Column('uuid', { name: 'parent_product_id', nullable: true })
  parentProductId: string | null;

  @Column('uuid', { name: 'brand_id' })
  brandId: string;

  @Column('uuid', { name: 'category_id' })
  categoryId: string;

  @OneToMany(
    () => CollectionProduct,
    (collectionProduct) => collectionProduct.product,
  )
  collectionProducts: CollectionProduct[];

  @OneToMany(() => GroupProduct, (groupProduct) => groupProduct.comboProduct)
  groupProducts: GroupProduct[];

  @OneToMany(() => MenuProduct, (menuProduct) => menuProduct.product)
  menuProducts: MenuProduct[];

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn([{ name: 'brand_id', referencedColumnName: 'id' }])
  brand: Brand;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: Category;

  @ManyToOne(() => Product, (product) => product.products)
  @JoinColumn([{ name: 'parent_product_id', referencedColumnName: 'id' }])
  parentProduct: Product;

  @OneToMany(() => Product, (product) => product.parentProduct)
  products: Product[];

  @OneToMany(() => ProductInGroup, (productInGroup) => productInGroup.product)
  productInGroups: ProductInGroup[];

  @OneToMany(
    () => PromotionProductMapping,
    (promotionProductMapping) => promotionProductMapping.product,
  )
  promotionProductMappings: PromotionProductMapping[];

  @OneToMany(
    () => VariantProductMapping,
    (variantProductMapping) => variantProductMapping.product,
  )
  variantProductMappings: VariantProductMapping[];
}
