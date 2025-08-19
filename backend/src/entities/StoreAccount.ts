import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Account } from './Account';
import { Store } from './Store';

@Index('ux_store_account_account_id', ['accountId'], { unique: true })
@Index('pk_store_account_id', ['id'], { unique: true })
@Entity('store_account', { schema: 'public' })
export class StoreAccount {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('uuid', { name: 'account_id', unique: true })
  accountId: string;

  @OneToOne(() => Account, (account) => account.storeAccount)
  @JoinColumn([{ name: 'account_id', referencedColumnName: 'id' }])
  account: Account;

  @ManyToOne(() => Store, (store) => store.storeAccounts)
  @JoinColumn([{ name: 'store_id', referencedColumnName: 'id' }])
  store: Store;
}
