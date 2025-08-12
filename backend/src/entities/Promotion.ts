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

@Index("FK_Promotion_Id", ["id"], { unique: true })
@Entity("Promotion", { schema: "dbo" })
export class Promotion {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("nvarchar", { name: "Name", length: 50 })
  name: string;

  @Column("varchar", { name: "Code", length: 20 })
  code: string;

  @Column("nvarchar", { name: "Description", nullable: true })
  description: string | null;

  @Column("varchar", { name: "Type", length: 20 })
  type: string;

  @Column("float", { name: "MaxDiscount", nullable: true, precision: 53 })
  maxDiscount: number | null;

  @Column("float", {
    name: "MinConditionAmount",
    nullable: true,
    precision: 53,
  })
  minConditionAmount: number | null;

  @Column("float", { name: "DiscountAmount", nullable: true, precision: 53 })
  discountAmount: number | null;

  @Column("float", { name: "DiscountPercent", nullable: true, precision: 53 })
  discountPercent: number | null;

  @Column("varchar", { name: "Status", nullable: true, length: 20 })
  status: string | null;

  @Column("int", { name: "StartTime", nullable: true })
  startTime: number | null;

  @Column("int", { name: "EndTime", nullable: true })
  endTime: number | null;

  @Column("int", { name: "DayFilter", nullable: true })
  dayFilter: number | null;

  @ManyToOne(() => Brand, (brand) => brand.promotions)
  @JoinColumn([{ name: "BrandId", referencedColumnName: "id" }])
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
