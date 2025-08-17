import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Brand } from "./Brand";

@Index("idx_transaction_brand_id", ["brandId"], {})
@Index("pk_transaction", ["id"], { unique: true })
@Entity("transaction", { schema: "public" })
export class Transaction {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "transaction_json", nullable: true })
  transactionJson: string | null;

  @Column("timestamp without time zone", { name: "created_date" })
  createdDate: Date;

  @Column("uuid", { name: "order_id", nullable: true })
  orderId: string | null;

  @Column("uuid", { name: "user_id", nullable: true })
  userId: string | null;

  @Column("character varying", { name: "status", length: 10 })
  status: string;

  @Column("uuid", { name: "brand_id" })
  brandId: string;

  @Column("numeric", { name: "amount", precision: 18, scale: 0 })
  amount: string;

  @Column("character varying", { name: "currency", length: 20 })
  currency: string;

  @Column("uuid", { name: "brand_partner_id", nullable: true })
  brandPartnerId: string | null;

  @Column("boolean", { name: "is_increase", nullable: true })
  isIncrease: boolean | null;

  @Column("character varying", { name: "type", nullable: true, length: 50 })
  type: string | null;

  @Column("character varying", {
    name: "payment_type",
    nullable: true,
    length: 20,
  })
  paymentType: string | null;

  @Column("character varying", {
    name: "description",
    nullable: true,
    length: 100,
  })
  description: string | null;

  @ManyToOne(() => Brand, (brand) => brand.transactions)
  @JoinColumn([{ name: "brand_id", referencedColumnName: "id" }])
  brand: Brand;
}
