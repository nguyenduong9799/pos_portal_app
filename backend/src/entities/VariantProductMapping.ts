import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Variant } from "./Variant";
import { Product } from "./Product";

@Index("PK_VariantProductMapping", ["id"], { unique: true })
@Entity("VariantProductMapping", { schema: "dbo" })
export class VariantProductMapping {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @ManyToOne(() => Variant, (variant) => variant.variantProductMappings)
  @JoinColumn([{ name: "VariantId", referencedColumnName: "id" }])
  variant: Variant;

  @ManyToOne(() => Product, (product) => product.variantProductMappings)
  @JoinColumn([{ name: "ProductId", referencedColumnName: "id" }])
  product: Product;
}
