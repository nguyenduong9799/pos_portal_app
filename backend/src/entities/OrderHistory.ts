import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Order } from "./Order";

@Index("order_history_pk_id", ["id"], { unique: true })
@Index("idx_order_history_order_id", ["orderId"], {})
@Entity("order_history", { schema: "public" })
export class OrderHistory {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("uuid", { name: "order_id" })
  orderId: string;

  @Column("timestamp without time zone", { name: "created_time" })
  createdTime: Date;

  @Column("character varying", { name: "from_status", length: 20 })
  fromStatus: string;

  @Column("character varying", { name: "to_status", length: 20 })
  toStatus: string;

  @Column("uuid", { name: "changed_by", nullable: true })
  changedBy: string | null;

  @Column("character varying", { name: "note", nullable: true, length: 500 })
  note: string | null;

  @ManyToOne(() => Order, (order) => order.orderHistories)
  @JoinColumn([{ name: "order_id", referencedColumnName: "id" }])
  order: Order;
}
