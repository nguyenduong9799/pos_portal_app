import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from './Product';
import { Promotion } from './Promotion';

@Index('fk_promotion_product_mapping_id', ['id'], { unique: true })
@Entity('promotion_product_mapping', { schema: 'public' })
export class PromotionProductMapping {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'status', nullable: true, length: 20 })
  status: string | null;

  @Column('integer', { name: 'quantity', nullable: true })
  quantity: number | null;

  @ManyToOne(() => Product, (product) => product.promotionProductMappings)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;

  @ManyToOne(() => Promotion, (promotion) => promotion.promotionProductMappings)
  @JoinColumn([{ name: 'promotion_id', referencedColumnName: 'id' }])
  promotion: Promotion;
}
