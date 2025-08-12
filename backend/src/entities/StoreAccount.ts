import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Store } from "./Store";
import { Account } from "./Account";

@Index("PK_StoreAccount_Id", ["id"], { unique: true })
@Index("UX_StoreAccount_AccountId", ["accountId"], { unique: true })
@Entity("StoreAccount", { schema: "dbo" })
export class StoreAccount {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("uniqueidentifier", { name: "AccountId", unique: true })
  accountId: string;

  @ManyToOne(() => Store, (store) => store.storeAccounts)
  @JoinColumn([{ name: "StoreId", referencedColumnName: "id" }])
  store: Store;

  @OneToOne(() => Account, (account) => account.storeAccount)
  @JoinColumn([{ name: "AccountId", referencedColumnName: "id" }])
  account: Account;
}
