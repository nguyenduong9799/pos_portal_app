import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { Variant } from "./Variant";

@Index("pk_variant_product_mapping", ["id"], { unique: true })
@Entity("variant_product_mapping", { schema: "public" })
export class VariantProductMapping {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @ManyToOne(() => Product, (product) => product.variantProductMappings)
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product: Product;

  @ManyToOne(() => Variant, (variant) => variant.variantProductMappings)
  @JoinColumn([{ name: "variant_id", referencedColumnName: "id" }])
  variant: Variant;
}
