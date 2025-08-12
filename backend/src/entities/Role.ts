import { Column, Entity, Index, OneToMany } from "typeorm";
import { Account } from "./Account";

@Index("PK_AccountRole_Id", ["id"], { unique: true })
@Entity("Role", { schema: "dbo" })
export class Role {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("nvarchar", { name: "Name", length: 20 })
  name: string;

  @OneToMany(() => Account, (account) => account.role)
  accounts: Account[];
}
