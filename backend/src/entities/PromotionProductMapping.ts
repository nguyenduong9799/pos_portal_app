import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { Promotion } from "./Promotion";

@Index("FK_PromotionProductMapping_Id", ["id"], { unique: true })
@Entity("PromotionProductMapping", { schema: "dbo" })
export class PromotionProductMapping {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("varchar", { name: "Status", nullable: true, length: 20 })
  status: string | null;

  @Column("int", { name: "Quantity", nullable: true })
  quantity: number | null;

  @ManyToOne(() => Product, (product) => product.promotionProductMappings)
  @JoinColumn([{ name: "ProductId", referencedColumnName: "id" }])
  product: Product;

  @ManyToOne(() => Promotion, (promotion) => promotion.promotionProductMappings)
  @JoinColumn([{ name: "PromotionId", referencedColumnName: "id" }])
  promotion: Promotion;
}
