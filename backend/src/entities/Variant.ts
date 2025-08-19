import { Column, Entity, Index, OneToMany } from 'typeorm';
import { VariantProductMapping } from './VariantProductMapping';

@Index('pk_variant', ['id'], { unique: true })
@Entity('variant', { schema: 'public' })
export class Variant {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'name', length: 50 })
  name: string;

  @Column('character varying', { name: 'status', length: 50 })
  status: string;

  @Column('uuid', { name: 'brand_id' })
  brandId: string;

  @Column('text', { name: 'value', nullable: true })
  value: string | null;

  @Column('integer', { name: 'display_order', nullable: true })
  displayOrder: number | null;

  @OneToMany(
    () => VariantProductMapping,
    (variantProductMapping) => variantProductMapping.variant,
  )
  variantProductMappings: VariantProductMapping[];
}
