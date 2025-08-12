import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { CollectionProduct } from "./CollectionProduct";
import { GroupProduct } from "./GroupProduct";
import { MenuProduct } from "./MenuProduct";
import { Brand } from "./Brand";
import { Category } from "./Category";
import { ProductInGroup } from "./ProductInGroup";
import { PromotionProductMapping } from "./PromotionProductMapping";
import { VariantProductMapping } from "./VariantProductMapping";

@Index("PK_ProductId", ["id"], { unique: true })
@Index("UX_Product_Code", ["code"], { unique: true })
@Entity("Product", { schema: "dbo" })
export class Product {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("nvarchar", { name: "Code", length: 20 })
  code: string;

  @Column("nvarchar", { name: "Name", length: 100 })
  name: string;

  @Column("float", { name: "SellingPrice", precision: 53 })
  sellingPrice: number;

  @Column("nvarchar", { name: "PicURL", nullable: true })
  picUrl: string | null;

  @Column("nvarchar", { name: "Status", length: 20 })
  status: string;

  @Column("float", { name: "HistoricalPrice", precision: 53 })
  historicalPrice: number;

  @Column("float", { name: "DiscountPrice", precision: 53 })
  discountPrice: number;

  @Column("nvarchar", { name: "Description", nullable: true })
  description: string | null;

  @Column("int", { name: "DisplayOrder" })
  displayOrder: number;

  @Column("nvarchar", { name: "Size", nullable: true, length: 10 })
  size: string | null;

  @Column("nvarchar", { name: "Type", length: 15 })
  type: string;

  @OneToMany(
    () => CollectionProduct,
    (collectionProduct) => collectionProduct.product
  )
  collectionProducts: CollectionProduct[];

  @OneToMany(() => GroupProduct, (groupProduct) => groupProduct.comboProduct)
  groupProducts: GroupProduct[];

  @OneToMany(() => MenuProduct, (menuProduct) => menuProduct.product)
  menuProducts: MenuProduct[];

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn([{ name: "BrandId", referencedColumnName: "id" }])
  brand: Brand;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn([{ name: "CategoryId", referencedColumnName: "id" }])
  category: Category;

  @ManyToOne(() => Product, (product) => product.products)
  @JoinColumn([{ name: "ParentProductId", referencedColumnName: "id" }])
  parentProduct: Product;

  @OneToMany(() => Product, (product) => product.parentProduct)
  products: Product[];

  @OneToMany(() => ProductInGroup, (productInGroup) => productInGroup.product)
  productInGroups: ProductInGroup[];

  @OneToMany(
    () => PromotionProductMapping,
    (promotionProductMapping) => promotionProductMapping.product
  )
  promotionProductMappings: PromotionProductMapping[];

  @OneToMany(
    () => VariantProductMapping,
    (variantProductMapping) => variantProductMapping.product
  )
  variantProductMappings: VariantProductMapping[];
}
