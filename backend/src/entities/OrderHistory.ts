import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Order } from "./Order";

@Index("OrderHistory_pk_id", ["id"], { unique: true })
@Entity("OrderHistory", { schema: "dbo" })
export class OrderHistory {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("datetime", { name: "CreatedTime" })
  createdTime: Date;

  @Column("varchar", { name: "FromStatus", length: 20 })
  fromStatus: string;

  @Column("varchar", { name: "ToStatus", length: 20 })
  toStatus: string;

  @Column("uniqueidentifier", { name: "ChangedBy", nullable: true })
  changedBy: string | null;

  @Column("nvarchar", { name: "Note", nullable: true, length: 500 })
  note: string | null;

  @ManyToOne(() => Order, (order) => order.orderHistories)
  @JoinColumn([{ name: "OrderId", referencedColumnName: "id" }])
  order: Order;
}
