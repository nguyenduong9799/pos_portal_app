import { Column, Entity, Index, OneToMany } from "typeorm";
import { Order } from "./Order";

@Index("PK_OrderSource_Id", ["id"], { unique: true })
@Entity("OrderUser", { schema: "dbo" })
export class OrderUser {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("nvarchar", { name: "UserType", nullable: true, length: 50 })
  userType: string | null;

  @Column("nvarchar", { name: "Address", nullable: true, length: 500 })
  address: string | null;

  @Column("nvarchar", { name: "Status", length: 50 })
  status: string;

  @Column("datetime", { name: "CreatedAt" })
  createdAt: Date;

  @Column("datetime", { name: "CompletedAt", nullable: true })
  completedAt: Date | null;

  @Column("uniqueidentifier", { name: "UserId", nullable: true })
  userId: string | null;

  @Column("nvarchar", { name: "Note", nullable: true, length: 256 })
  note: string | null;

  @Column("nvarchar", { name: "Name", nullable: true, length: 100 })
  name: string | null;

  @Column("nvarchar", { name: "Phone", nullable: true, length: 20 })
  phone: string | null;

  @Column("varchar", { name: "PaymentStatus", nullable: true, length: 10 })
  paymentStatus: string | null;

  @Column("bit", { name: "IsSync", nullable: true })
  isSync: boolean | null;

  @OneToMany(() => Order, (order) => order.orderSource)
  orders: Order[];
}
