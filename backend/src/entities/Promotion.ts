import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Brand } from "./Brand";
import { PromotionOrderMapping } from "./PromotionOrderMapping";
import { PromotionProductMapping } from "./PromotionProductMapping";

@Index("idx_promotion_brand_id", ["brandId"], {})
@Index("fk_promotion_id", ["id"], { unique: true })
@Entity("promotion", { schema: "public" })
export class Promotion {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "name", length: 50 })
  name: string;

  @Column("character varying", { name: "code", length: 20 })
  code: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("character varying", { name: "type", length: 20 })
  type: string;

  @Column("double precision", {
    name: "max_discount",
    nullable: true,
  })
  maxDiscount: number | null;

  @Column("double precision", {
    name: "min_condition_amount",
    nullable: true,

  })
  minConditionAmount: number | null;

  @Column("double precision", {
    name: "discount_amount",
    nullable: true,

  })
  discountAmount: number | null;

  @Column("double precision", {
    name: "discount_percent",
    nullable: true,

  })
  discountPercent: number | null;

  @Column("character varying", { name: "status", nullable: true, length: 20 })
  status: string | null;

  @Column("uuid", { name: "brand_id" })
  brandId: string;

  @Column("integer", { name: "start_time", nullable: true })
  startTime: number | null;

  @Column("integer", { name: "end_time", nullable: true })
  endTime: number | null;

  @Column("integer", { name: "day_filter", nullable: true })
  dayFilter: number | null;

  @ManyToOne(() => Brand, (brand) => brand.promotions)
  @JoinColumn([{ name: "brand_id", referencedColumnName: "id" }])
  brand: Brand;

  @OneToMany(
    () => PromotionOrderMapping,
    (promotionOrderMapping) => promotionOrderMapping.promotion
  )
  promotionOrderMappings: PromotionOrderMapping[];

  @OneToMany(
    () => PromotionProductMapping,
    (promotionProductMapping) => promotionProductMapping.promotion
  )
  promotionProductMappings: PromotionProductMapping[];
}
