import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Role } from './Role';
import { BrandAccount } from './BrandAccount';
import { Order } from './Order';
import { StoreAccount } from './StoreAccount';

@Index('PK_AccountId', ['id'], { unique: true })
@Index('UX_Account_Username', ['username'], { unique: true })
@Entity('Account', { schema: 'dbo' })
export class Account {
  @Column('uniqueidentifier', { primary: true, name: 'Id' })
  id: string;

  @Column('nvarchar', { name: 'Name', length: 50 })
  name: string;

  @Column('nvarchar', { name: 'Password', length: 64 })
  password: string;

  @Column('nvarchar', { name: 'Status', length: 20 })
  status: string;

  @Column('nvarchar', { name: 'Username', unique: true, length: 50 })
  username: string;

  @ManyToOne(() => Role, (role) => role.accounts)
  @JoinColumn([{ name: 'RoleId', referencedColumnName: 'id' }])
  role: Role;

  @OneToOne(() => BrandAccount, (brandAccount) => brandAccount.account)
  brandAccount: BrandAccount;

  @OneToMany(() => Order, (order) => order.checkInPerson)
  orders: Order[];

  @OneToOne(() => StoreAccount, (storeAccount) => storeAccount.account)
  storeAccount: StoreAccount;
}
