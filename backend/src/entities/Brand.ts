import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BrandAccount } from './BrandAccount';
import { BrandPartner } from './BrandPartner';
import { BrandPaymentMapping } from './BrandPaymentMapping';
import { Category } from './Category';
import { Collection } from './Collection';
import { Menu } from './Menu';
import { Product } from './Product';
import { Promotion } from './Promotion';
import { Store } from './Store';
import { Transaction } from './Transaction';
import { User } from './User';

@Index('pk_brand_id', ['id'], { unique: true })
@Entity('brand', { schema: 'public' })
export class Brand {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'name', length: 50 })
  name: string;

  @Column('character varying', { name: 'email', nullable: true, length: 254 })
  email: string | null;

  @Column('character varying', { name: 'address', nullable: true, length: 256 })
  address: string | null;

  @Column('character varying', { name: 'phone', nullable: true, length: 20 })
  phone: string | null;

  @Column('text', { name: 'pic_url', nullable: true })
  picUrl: string | null;

  @Column('character varying', { name: 'status', length: 20 })
  status: string;

  @Column('character varying', {
    name: 'brand_code',
    nullable: true,
    length: 50,
  })
  brandCode: string | null;

  @Column('double precision', {
    name: 'brand_balance',
    nullable: true,
  })
  brandBalance: number | null;

  @Column('character varying', { name: 'pic_rl', nullable: true, length: 256 })
  picRl: string | null;

  @OneToMany(() => BrandAccount, (brandAccount) => brandAccount.brand)
  brandAccounts: BrandAccount[];

  @OneToMany(() => BrandPartner, (brandPartner) => brandPartner.brandPartner)
  brandPartners: BrandPartner[];

  @OneToMany(() => BrandPartner, (brandPartner) => brandPartner.masterBrand)
  brandPartners2: BrandPartner[];

  @OneToMany(
    () => BrandPaymentMapping,
    (brandPaymentMapping) => brandPaymentMapping.brand,
  )
  brandPaymentMappings: BrandPaymentMapping[];

  @OneToMany(() => Category, (category) => category.brand)
  categories: Category[];

  @OneToMany(() => Collection, (collection) => collection.brand)
  collections: Collection[];

  @OneToMany(() => Menu, (menu) => menu.brand)
  menus: Menu[];

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];

  @OneToMany(() => Promotion, (promotion) => promotion.brand)
  promotions: Promotion[];

  @OneToMany(() => Store, (store) => store.brand)
  stores: Store[];

  @OneToMany(() => Transaction, (transaction) => transaction.brand)
  transactions: Transaction[];

  @OneToMany(() => User, (user) => user.brand)
  users: User[];
}
