import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Brand } from './Brand';

@Index('idx_brand_partner_brand_partner_id', ['brandPartnerId'], {})
@Index('brand_partner_pk', ['id'], { unique: true })
@Index('idx_brand_partner_master_brand_id', ['masterBrandId'], {})
@Entity('brand_partner', { schema: 'public' })
export class BrandPartner {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('uuid', { name: 'master_brand_id' })
  masterBrandId: string;

  @Column('uuid', { name: 'brand_partner_id' })
  brandPartnerId: string;

  @Column('double precision', { name: 'debt_balance' })
  debtBalance: number;

  @Column('timestamp without time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp without time zone', { name: 'updated_at' })
  updatedAt: Date;

  @Column('character varying', { name: 'status', length: 20 })
  status: string;

  @Column('character varying', { name: 'type', length: 20 })
  type: string;

  @ManyToOne(() => Brand, (brand) => brand.brandPartners)
  @JoinColumn([{ name: 'brand_partner_id', referencedColumnName: 'id' }])
  brandPartner: Brand;

  @ManyToOne(() => Brand, (brand) => brand.brandPartners2)
  @JoinColumn([{ name: 'master_brand_id', referencedColumnName: 'id' }])
  masterBrand: Brand;
}
