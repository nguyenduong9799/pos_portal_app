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

@Index("pk_order_detail_id", ["id"], { unique: true })
@Index("idx_order_detail_order_id", ["orderId"], {})
@Entity("order_detail", { schema: "public" })
export class OrderDetail {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("uuid", { name: "order_id" })
  orderId: string;

  @Column("integer", { name: "quantity" })
  quantity: number;

  @Column("double precision", { name: "discount" })
  discount: number;

  @Column("double precision", { name: "total_amount" })
  totalAmount: number;

  @Column("double precision", { name: "final_amount"})
  finalAmount: number;

  @Column("character varying", { name: "notes", nullable: true, length: 200 })
  notes: string | null;

  @Column("double precision", { name: "selling_price" })
  sellingPrice: number;

  @ManyToOne(() => OrderDetail, (orderDetail) => orderDetail.orderDetails)
  @JoinColumn([{ name: "master_order_detail_id", referencedColumnName: "id" }])
  masterOrderDetail: OrderDetail;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.masterOrderDetail)
  orderDetails: OrderDetail[];

  @ManyToOne(() => MenuProduct, (menuProduct) => menuProduct.orderDetails)
  @JoinColumn([{ name: "menu_product_id", referencedColumnName: "id" }])
  menuProduct: MenuProduct;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn([{ name: "order_id", referencedColumnName: "id" }])
  order: Order;
}
