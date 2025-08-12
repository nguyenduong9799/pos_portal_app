import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { MenuProduct } from "./MenuProduct";
import { Order } from "./Order";

@Index("PK_OrderDetail_Id", ["id"], { unique: true })
@Entity("OrderDetail", { schema: "dbo" })
export class OrderDetail {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("int", { name: "Quantity" })
  quantity: number;

  @Column("float", { name: "Discount", precision: 53 })
  discount: number;

  @Column("float", { name: "TotalAmount", precision: 53 })
  totalAmount: number;

  @Column("float", { name: "FinalAmount", precision: 53 })
  finalAmount: number;

  @Column("nvarchar", { name: "Notes", nullable: true, length: 200 })
  notes: string | null;

  @Column("float", { name: "SellingPrice", precision: 53 })
  sellingPrice: number;

  @ManyToOne(() => MenuProduct, (menuProduct) => menuProduct.orderDetails)
  @JoinColumn([{ name: "MenuProductId", referencedColumnName: "id" }])
  menuProduct: MenuProduct;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn([{ name: "OrderId", referencedColumnName: "id" }])
  order: Order;

  @ManyToOne(() => OrderDetail, (orderDetail) => orderDetail.orderDetails)
  @JoinColumn([{ name: "MasterOrderDetailId", referencedColumnName: "id" }])
  masterOrderDetail: OrderDetail;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.masterOrderDetail)
  orderDetails: OrderDetail[];
}
