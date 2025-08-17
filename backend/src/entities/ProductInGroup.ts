import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { GroupProduct } from "./GroupProduct";
import { Product } from "./Product";

@Index("pk__product_i__3214ec07549e2029", ["id"], { unique: true })
@Entity("product_in_group", { schema: "public" })
export class ProductInGroup {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("integer", { name: "priority", default: () => "0" })
  priority: number;

  @Column("double precision", {
    name: "additional_price",
    default: () => "0",
  })
  additionalPrice: number;

  @Column("integer", { name: "min", default: () => "0" })
  min: number;

  @Column("integer", { name: "max", default: () => "0" })
  max: number;

  @Column("integer", { name: "quantity", default: () => "0" })
  quantity: number;

  @Column("character varying", { name: "status", length: 20 })
  status: string;

  @ManyToOne(() => GroupProduct, (groupProduct) => groupProduct.productInGroups)
  @JoinColumn([{ name: "group_product_id", referencedColumnName: "id" }])
  groupProduct: GroupProduct;

  @ManyToOne(() => Product, (product) => product.productInGroups)
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product: Product;
}
