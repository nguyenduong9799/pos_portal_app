import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { GroupProduct } from "./GroupProduct";

@Index("PK__ProductI__3214EC07549E2029", ["id"], { unique: true })
@Entity("ProductInGroup", { schema: "dbo" })
export class ProductInGroup {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("int", { name: "Priority", default: () => "(0)" })
  priority: number;

  @Column("float", {
    name: "AdditionalPrice",
    precision: 53,
    default: () => "(0)",
  })
  additionalPrice: number;

  @Column("int", { name: "Min", default: () => "(0)" })
  min: number;

  @Column("int", { name: "Max", default: () => "(0)" })
  max: number;

  @Column("int", { name: "Quantity", default: () => "(0)" })
  quantity: number;

  @Column("nvarchar", { name: "Status", length: 20 })
  status: string;

  @ManyToOne(() => Product, (product) => product.productInGroups)
  @JoinColumn([{ name: "ProductId", referencedColumnName: "id" }])
  product: Product;

  @ManyToOne(() => GroupProduct, (groupProduct) => groupProduct.productInGroups)
  @JoinColumn([{ name: "GroupProductId", referencedColumnName: "id" }])
  groupProduct: GroupProduct;
}
