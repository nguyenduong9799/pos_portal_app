import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./Products";
import { Orders } from "./Orders";

@Entity("order_items", { schema: "dbo" })
export class OrderItems {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "quantity" })
  quantity: number;

  @Column("decimal", { name: "unitPrice", precision: 10, scale: 2 })
  unitPrice: number;

  @Column("decimal", { name: "total", precision: 10, scale: 2 })
  total: number;

  @Column("nvarchar", { name: "notes", nullable: true, length: 500 })
  notes: string | null;

  @Column("datetime2", { name: "createdAt", default: () => "getdate()" })
  createdAt: Date;

  @ManyToOne(() => Products, (products) => products.orderItems)
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Products;

  @ManyToOne(() => Orders, (orders) => orders.orderItems)
  @JoinColumn([{ name: "orderId", referencedColumnName: "id" }])
  order: Orders;
}
