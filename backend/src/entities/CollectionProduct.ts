import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Collection } from './Collection';
import { Product } from './Product';

@Index('pk_collection_product_id', ['id'], { unique: true })
@Entity('collection_product', { schema: 'public' })
export class CollectionProduct {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'status', length: 20 })
  status: string;

  @ManyToOne(() => Collection, (collection) => collection.collectionProducts)
  @JoinColumn([{ name: 'collection_id', referencedColumnName: 'id' }])
  collection: Collection;

  @ManyToOne(() => Product, (product) => product.collectionProducts)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Product;
}
