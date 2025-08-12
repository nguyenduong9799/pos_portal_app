import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Category } from "./Category";

@Index("PK_ExtraCategory_Id", ["id"], { unique: true })
@Entity("ExtraCategory", { schema: "dbo" })
export class ExtraCategory {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("nvarchar", { name: "Status", length: 20 })
  status: string;

  @Column("varchar", { name: "Type", nullable: true, length: 20 })
  type: string | null;

  @ManyToOne(() => Category, (category) => category.extraCategories)
  @JoinColumn([{ name: "ExtraCategoryId", referencedColumnName: "id" }])
  extraCategory: Category;

  @ManyToOne(() => Category, (category) => category.extraCategories2)
  @JoinColumn([{ name: "ProductCategoryId", referencedColumnName: "id" }])
  productCategory: Category;
}
