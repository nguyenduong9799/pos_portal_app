import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Account } from "./Account";
import { Brand } from "./Brand";

@Index("PK_BrandAccount_Id", ["id"], { unique: true })
@Index("UX_BrandAccount_Account", ["accountId"], { unique: true })
@Entity("BrandAccount", { schema: "dbo" })
export class BrandAccount {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("uniqueidentifier", { name: "AccountId", unique: true })
  accountId: string;

  @OneToOne(() => Account, (account) => account.brandAccount)
  @JoinColumn([{ name: "AccountId", referencedColumnName: "id" }])
  account: Account;

  @ManyToOne(() => Brand, (brand) => brand.brandAccounts)
  @JoinColumn([{ name: "BrandId", referencedColumnName: "id" }])
  brand: Brand;
}
