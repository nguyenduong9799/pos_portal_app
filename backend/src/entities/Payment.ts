import { Column, Entity, Index } from "typeorm";

@Index("PK_Payment", ["id"], { unique: true })
@Entity("Payment", { schema: "dbo" })
export class Payment {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("uniqueidentifier", { name: "OrderId" })
  orderId: string;

  @Column("float", { name: "Amount", precision: 53 })
  amount: number;

  @Column("char", { name: "CurrencyCode", nullable: true, length: 10 })
  currencyCode: string | null;

  @Column("nvarchar", { name: "Notes", nullable: true, length: 250 })
  notes: string | null;

  @Column("datetime", { name: "PayTime", nullable: true })
  payTime: Date | null;

  @Column("varchar", { name: "Status", length: 10 })
  status: string;

  @Column("varchar", { name: "Type", length: 10 })
  type: string;

  @Column("uniqueidentifier", { name: "SourceId", nullable: true })
  sourceId: string | null;
}
