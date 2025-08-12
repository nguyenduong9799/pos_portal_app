import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Promotion } from "./Promotion";
import { Order } from "./Order";

@Index("PK_PromotionOrderMapping_Id", ["id"], { unique: true })
@Entity("PromotionOrderMapping", { schema: "dbo" })
export class PromotionOrderMapping {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("float", { name: "DiscountAmount", nullable: true, precision: 53 })
  discountAmount: number | null;

  @Column("int", { name: "Quantity", nullable: true })
  quantity: number | null;

  @Column("uniqueidentifier", { name: "OrderDetailId", nullable: true })
  orderDetailId: string | null;

  @Column("varchar", { name: "EffectType", nullable: true, length: 50 })
  effectType: string | null;

  @Column("varchar", { name: "VoucherCode", nullable: true, length: 100 })
  voucherCode: string | null;

  @ManyToOne(() => Promotion, (promotion) => promotion.promotionOrderMappings)
  @JoinColumn([{ name: "PromotionId", referencedColumnName: "id" }])
  promotion: Promotion;

  @ManyToOne(() => Order, (order) => order.promotionOrderMappings)
  @JoinColumn([{ name: "OrderId", referencedColumnName: "id" }])
  order: Order;
}
