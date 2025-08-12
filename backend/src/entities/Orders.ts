import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderItems } from "./OrderItems";
import { Users } from "./Users";
import { Customers } from "./Customers";
import { Payments } from "./Payments";

@Index("UQ_59b0c3b34ea0fa5562342f24143", ["orderNumber"], { unique: true })
@Entity("orders", { schema: "dbo" })
export class Orders {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "orderNumber", unique: true, length: 50 })
  orderNumber: string;

  @Column("decimal", { name: "subtotal", precision: 10, scale: 2 })
  subtotal: number;

  @Column("decimal", {
    name: "taxAmount",
    precision: 10,
    scale: 2,
    default: () => "(0)",
  })
  taxAmount: number;

  @Column("decimal", {
    name: "discountAmount",
    precision: 10,
    scale: 2,
    default: () => "(0)",
  })
  discountAmount: number;

  @Column("decimal", { name: "total", precision: 10, scale: 2 })
  total: number;

  @Column("nvarchar", {
    name: "status",
    length: 20,
    default: () => "'pending'",
  })
  status: string;

  @Column("nvarchar", { name: "notes", nullable: true, length: 500 })
  notes: string | null;

  @Column("datetime2", { name: "createdAt", default: () => "getdate()" })
  createdAt: Date;

  @Column("datetime2", { name: "updatedAt", default: () => "getdate()" })
  updatedAt: Date;

  @OneToMany(() => OrderItems, (orderItems) => orderItems.order)
  orderItems: OrderItems[];

  @ManyToOne(() => Users, (users) => users.orders)
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(() => Customers, (customers) => customers.orders)
  @JoinColumn([{ name: "customerId", referencedColumnName: "id" }])
  customer: Customers;

  @OneToOne(() => Payments, (payments) => payments.order)
  payments: Payments;
}
