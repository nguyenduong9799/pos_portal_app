import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Brand } from "./Brand";

@Index("PK_Transaction", ["id"], { unique: true })
@Entity("Transaction", { schema: "dbo" })
export class Transaction {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("nvarchar", { name: "TransactionJson", nullable: true })
  transactionJson: string | null;

  @Column("datetime", { name: "CreatedDate" })
  createdDate: Date;

  @Column("uniqueidentifier", { name: "OrderId", nullable: true })
  orderId: string | null;

  @Column("uniqueidentifier", { name: "UserId", nullable: true })
  userId: string | null;

  @Column("varchar", { name: "Status", length: 10 })
  status: string;

  @Column("decimal", { name: "Amount", precision: 18, scale: 0 })
  amount: number;

  @Column("nvarchar", { name: "Currency", length: 20 })
  currency: string;

  @Column("uniqueidentifier", { name: "BrandPartnerId", nullable: true })
  brandPartnerId: string | null;

  @Column("bit", { name: "IsIncrease", nullable: true })
  isIncrease: boolean | null;

  @Column("nvarchar", { name: "Type", nullable: true, length: 50 })
  type: string | null;

  @Column("varchar", { name: "PaymentType", nullable: true, length: 20 })
  paymentType: string | null;

  @Column("nvarchar", { name: "Description", nullable: true, length: 100 })
  description: string | null;

  @ManyToOne(() => Brand, (brand) => brand.transactions)
  @JoinColumn([{ name: "BrandId", referencedColumnName: "id" }])
  brand: Brand;
}
