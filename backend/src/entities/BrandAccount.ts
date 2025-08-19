import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Account } from './Account';
import { Brand } from './Brand';

@Index('ux_brand_account_account', ['accountId'], { unique: true })
@Index('idx_brand_account_brand_id', ['brandId'], {})
@Index('pk_brand_account_id', ['id'], { unique: true })
@Entity('brand_account', { schema: 'public' })
export class BrandAccount {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('uuid', { name: 'brand_id' })
  brandId: string;

  @Column('uuid', { name: 'account_id', unique: true })
  accountId: string;

  @OneToOne(() => Account, (account) => account.brandAccount)
  @JoinColumn([{ name: 'account_id', referencedColumnName: 'id' }])
  account: Account;

  @ManyToOne(() => Brand, (brand) => brand.brandAccounts)
  @JoinColumn([{ name: 'brand_id', referencedColumnName: 'id' }])
  brand: Brand;
}
