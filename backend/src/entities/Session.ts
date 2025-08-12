import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Order } from "./Order";
import { Store } from "./Store";

@Index("PK_Session_Id", ["id"], { unique: true })
@Entity("Session", { schema: "dbo" })
export class Session {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("datetime2", { name: "StartDateTime" })
  startDateTime: Date;

  @Column("datetime2", { name: "EndDateTime" })
  endDateTime: Date;

  @Column("int", { name: "NumberOfOrders" })
  numberOfOrders: number;

  @Column("float", { name: "TotalAmount", nullable: true, precision: 53 })
  totalAmount: number | null;

  @Column("int", { name: "TotalPromotion", nullable: true })
  totalPromotion: number | null;

  @Column("float", { name: "TotalChangeCash", nullable: true, precision: 53 })
  totalChangeCash: number | null;

  @Column("float", {
    name: "TotalDiscountAmount",
    nullable: true,
    precision: 53,
  })
  totalDiscountAmount: number | null;

  @Column("float", { name: "TotalFinalAmount", nullable: true, precision: 53 })
  totalFinalAmount: number | null;

  @Column("nvarchar", {
    name: "Name",
    nullable: true,
    length: 50,
    default: () => "NULL",
  })
  name: string | null;

  @OneToMany(() => Order, (order) => order.session)
  orders: Order[];

  @ManyToOne(() => Store, (store) => store.sessions)
  @JoinColumn([{ name: "StoreId", referencedColumnName: "id" }])
  store: Store;
}
