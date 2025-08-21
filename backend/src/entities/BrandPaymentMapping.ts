import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Brand } from './Brand';
import { PaymentType } from './PaymentType';

@Index('idx_brand_payment_mapping_brand_id', ['brandId'], {})
@Index('brand_payment_mapping_pk', ['id'], { unique: true })
@Entity('brand_payment_mapping', { schema: 'public' })
export class BrandPaymentMapping {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('uuid', { name: 'brand_id' })
  brandId: string;

  @Column('integer', { name: 'display_order' })
  displayOrder: number;

  @Column('character varying', { name: 'status', length: 20 })
  status: string;

  @ManyToOne(() => Brand, (brand) => brand.brandPaymentMappings)
  @JoinColumn([{ name: 'brand_id', referencedColumnName: 'id' }])
  brand: Brand;

  @ManyToOne(
    () => PaymentType,
    (paymentType) => paymentType.brandPaymentMappings,
  )
  @JoinColumn([{ name: 'payment_type', referencedColumnName: 'type' }])
  paymentType: PaymentType;
}
