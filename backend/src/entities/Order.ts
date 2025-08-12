import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Account } from "./Account";
import { OrderUser } from "./OrderUser";
import { Session } from "./Session";
import { OrderDetail } from "./OrderDetail";
import { OrderHistory } from "./OrderHistory";
import { PromotionOrderMapping } from "./PromotionOrderMapping";

@Index("PK_OrderID", ["id"], { unique: true })
@Index("UQ_Order_InvoiceID", ["invoiceId"], { unique: true })
@Entity("Order", { schema: "dbo" })
export class Order {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("datetime2", { name: "CheckInDate" })
  checkInDate: Date;

  @Column("datetime2", { name: "CheckOutDate" })
  checkOutDate: Date;

  @Column("nvarchar", { name: "InvoiceID", unique: true, length: 50 })
  invoiceId: string;

  @Column("float", { name: "TotalAmount", precision: 53 })
  totalAmount: number;

  @Column("float", { name: "Discount", precision: 53 })
  discount: number;

  @Column("float", { name: "FinalAmount", precision: 53 })
  finalAmount: number;

  @Column("float", { name: "VAT", precision: 53 })
  vat: number;

  @Column("float", { name: "VATAmount", precision: 53 })
  vatAmount: number;

  @Column("nvarchar", { name: "OrderType", nullable: true, length: 20 })
  orderType: string | null;

  @Column("int", { name: "NumberOfGuest", nullable: true })
  numberOfGuest: number | null;

  @Column("nvarchar", { name: "Status", length: 20 })
  status: string;

  @Column("nvarchar", { name: "Note", nullable: true })
  note: string | null;

  @Column("float", { name: "FeeAmount", nullable: true, precision: 53 })
  feeAmount: number | null;

  @Column("nvarchar", { name: "FeeDescription", nullable: true, length: 50 })
  feeDescription: string | null;

  @Column("varchar", { name: "PaymentType", nullable: true, length: 50 })
  paymentType: string | null;

  @ManyToOne(() => Account, (account) => account.orders)
  @JoinColumn([{ name: "CheckInPerson", referencedColumnName: "id" }])
  checkInPerson: Account;

  @ManyToOne(() => OrderUser, (orderUser) => orderUser.orders)
  @JoinColumn([{ name: "OrderSourceId", referencedColumnName: "id" }])
  orderSource: OrderUser;

  @ManyToOne(() => Session, (session) => session.orders)
  @JoinColumn([{ name: "SessionId", referencedColumnName: "id" }])
  session: Session;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];

  @OneToMany(() => OrderHistory, (orderHistory) => orderHistory.order)
  orderHistories: OrderHistory[];

  @OneToMany(
    () => PromotionOrderMapping,
    (promotionOrderMapping) => promotionOrderMapping.order
  )
  promotionOrderMappings: PromotionOrderMapping[];
}
