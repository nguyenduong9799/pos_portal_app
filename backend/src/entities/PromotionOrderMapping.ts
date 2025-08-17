import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Order } from "./Order";
import { Promotion } from "./Promotion";

@Index("pk_promotion_order_mapping_id", ["id"], { unique: true })
@Entity("promotion_order_mapping", { schema: "public" })
export class PromotionOrderMapping {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("double precision", {
    name: "discount_amount",
    nullable: true,
  })
  discountAmount: number | null;

  @Column("integer", { name: "quantity", nullable: true })
  quantity: number | null;

  @Column("uuid", { name: "order_detail_id", nullable: true })
  orderDetailId: string | null;

  @Column("character varying", {
    name: "effect_type",
    nullable: true,
    length: 50,
  })
  effectType: string | null;

  @Column("character varying", {
    name: "voucher_code",
    nullable: true,
    length: 100,
  })
  voucherCode: string | null;

  @ManyToOne(() => Order, (order) => order.promotionOrderMappings)
  @JoinColumn([{ name: "order_id", referencedColumnName: "id" }])
  order: Order;

  @ManyToOne(() => Promotion, (promotion) => promotion.promotionOrderMappings)
  @JoinColumn([{ name: "promotion_id", referencedColumnName: "id" }])
  promotion: Promotion;
}
