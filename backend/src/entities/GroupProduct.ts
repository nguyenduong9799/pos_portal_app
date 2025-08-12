import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Product } from "./Product";
import { ProductInGroup } from "./ProductInGroup";

@Index("PK__GroupPro__3214EC0705D5CB61", ["id"], { unique: true })
@Entity("GroupProduct", { schema: "dbo" })
export class GroupProduct {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("nvarchar", { name: "Name", length: 50, default: () => "''" })
  name: string;

  @Column("nvarchar", {
    name: "CombinationMode",
    length: 30,
    default: () => "''",
  })
  combinationMode: string;

  @Column("int", { name: "Priority", default: () => "(0)" })
  priority: number;

  @Column("int", { name: "Quantity", default: () => "(0)" })
  quantity: number;

  @Column("nvarchar", { name: "Status", length: 20 })
  status: string;

  @ManyToOne(() => Product, (product) => product.groupProducts)
  @JoinColumn([{ name: "ComboProductId", referencedColumnName: "id" }])
  comboProduct: Product;

  @OneToMany(
    () => ProductInGroup,
    (productInGroup) => productInGroup.groupProduct
  )
  productInGroups: ProductInGroup[];
}
