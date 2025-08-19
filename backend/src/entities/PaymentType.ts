import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BrandPaymentMapping } from './BrandPaymentMapping';

@Index('payment_type_pk', ['type'], { unique: true })
@Entity('payment_type', { schema: 'public' })
export class PaymentType {
  @Column('character varying', { primary: true, name: 'type', length: 20 })
  type: string;

  @Column('character varying', { name: 'name', length: 100 })
  name: string;

  @Column('text', { name: 'pic_url' })
  picUrl: string;

  @Column('character varying', { name: 'payment_code', length: 20 })
  paymentCode: string;

  @Column('character varying', { name: 'status', length: 20 })
  status: string;

  @OneToMany(
    () => BrandPaymentMapping,
    (brandPaymentMapping) => brandPaymentMapping.paymentType,
  )
  brandPaymentMappings: BrandPaymentMapping[];
}
