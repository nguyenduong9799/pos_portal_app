import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./Orders";

@Entity("payments", { schema: "dbo" })
export class Payments {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("decimal", { name: "amount", precision: 10, scale: 2 })
  amount: number;

  @Column("nvarchar", { name: "method", length: 20 })
  method: string;

  @Column("nvarchar", {
    name: "status",
    length: 20,
    default: () => "'completed'",
  })
  status: string;

  @Column("nvarchar", { name: "transactionId", nullable: true, length: 100 })
  transactionId: string | null;

  @Column("nvarchar", { name: "notes", nullable: true, length: 500 })
  notes: string | null;

  @Column("datetime2", { name: "createdAt", default: () => "getdate()" })
  createdAt: Date;

  @OneToOne(() => Orders, (orders) => orders.payments)
  @JoinColumn([{ name: "orderId", referencedColumnName: "id" }])
  order: Orders;
}
