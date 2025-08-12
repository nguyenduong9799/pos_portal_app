import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Brand } from "./Brand";
import { Store } from "./Store";
import { ExtraCategory } from "./ExtraCategory";
import { Product } from "./Product";

@Index("PK_CategoryId", ["id"], { unique: true })
@Index("UX_Category_Code", ["code"], { unique: true })
@Entity("Category", { schema: "dbo" })
export class Category {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("nvarchar", { name: "Code", length: 20 })
  code: string;

  @Column("nvarchar", { name: "Name", length: 50 })
  name: string;

  @Column("nvarchar", { name: "Type", length: 20 })
  type: string;

  @Column("int", { name: "DisplayOrder" })
  displayOrder: number;

  @Column("nvarchar", { name: "Description", nullable: true, length: 100 })
  description: string | null;

  @Column("nvarchar", { name: "PicUrl", nullable: true })
  picUrl: string | null;

  @Column("nvarchar", { name: "Status", length: 20 })
  status: string;

  @ManyToOne(() => Brand, (brand) => brand.categories)
  @JoinColumn([{ name: "BrandId", referencedColumnName: "id" }])
  brand: Brand;

  @ManyToMany(() => Store, (store) => store.categories)
  stores: Store[];

  @OneToMany(
    () => ExtraCategory,
    (extraCategory) => extraCategory.extraCategory
  )
  extraCategories: ExtraCategory[];

  @OneToMany(
    () => ExtraCategory,
    (extraCategory) => extraCategory.productCategory
  )
  extraCategories2: ExtraCategory[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
