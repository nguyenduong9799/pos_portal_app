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

@Index('PK_Brand_Id', ['id'], { unique: true })
@Entity('Brand', { schema: 'dbo' })
export class Brand {
  @Column('uniqueidentifier', { primary: true, name: 'Id' })
  id: string;

  @Column('nvarchar', { name: 'Name', length: 50 })
  name: string;

  @Column('nvarchar', { name: 'Email', nullable: true, length: 254 })
  email: string | null;

  @Column('nvarchar', { name: 'Address', nullable: true, length: 256 })
  address: string | null;

  @Column('varchar', { name: 'Phone', nullable: true, length: 20 })
  phone: string | null;

  @Column('varchar', { name: 'PicUrl', nullable: true })
  picUrl: string | null;

  @Column('nvarchar', { name: 'Status', length: 20 })
  status: string;

  @Column('varchar', { name: 'BrandCode', nullable: true, length: 50 })
  brandCode: string | null;

  @Column('float', { name: 'BrandBalance', nullable: true, precision: 53 })
  brandBalance: number | null;

  @OneToMany(() => BrandAccount, (brandAccount) => brandAccount.brand)
  brandAccounts: BrandAccount[];

  @OneToMany(() => BrandPartner, (brandPartner) => brandPartner.masterBrand)
  brandPartners: BrandPartner[];

  @OneToMany(() => BrandPartner, (brandPartner) => brandPartner.brandPartner)
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
