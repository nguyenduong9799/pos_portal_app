import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Role } from "./Role";
import { BrandAccount } from "./BrandAccount";
import { Order } from "./Order";
import { StoreAccount } from "./StoreAccount";

@Index("pk_account_id", ["id"], { unique: true })
@Index("ux_account_username", ["username"], { unique: true })
@Entity("account", { schema: "public" })
export class Account {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "name", length: 50 })
  name: string;

  @Column("character varying", { name: "password", length: 64 })
  password: string;

  @Column("character varying", { name: "status", length: 20 })
  status: string;

  @Column("character varying", { name: "username", unique: true, length: 50 })
  username: string;

  @Column("character varying", { name: "roleid", nullable: true, length: 50 })
  roleid: string | null;

  @ManyToOne(() => Role, (role) => role.accounts)
  @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
  role: Role;

  @OneToOne(() => BrandAccount, (brandAccount) => brandAccount.account)
  brandAccount: BrandAccount;

  @OneToMany(() => Order, (order) => order.checkInPerson)
  orders: Order[];

  @OneToOne(() => StoreAccount, (storeAccount) => storeAccount.account)
  storeAccount: StoreAccount;
}
