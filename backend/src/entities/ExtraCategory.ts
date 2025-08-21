import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Category } from './Category';

@Index('pk_extra_category_id', ['id'], { unique: true })
@Entity('extra_category', { schema: 'public' })
export class ExtraCategory {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'status', length: 20 })
  status: string;

  @Column('character varying', { name: 'type', nullable: true, length: 20 })
  type: string | null;

  @ManyToOne(() => Category, (category) => category.extraCategories)
  @JoinColumn([{ name: 'extra_category_id', referencedColumnName: 'id' }])
  extraCategory: Category;

  @ManyToOne(() => Category, (category) => category.extraCategories2)
  @JoinColumn([{ name: 'product_category_id', referencedColumnName: 'id' }])
  productCategory: Category;
}
