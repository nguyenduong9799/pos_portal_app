import { Column, Entity, Index, OneToMany } from "typeorm";
import { VariantProductMapping } from "./VariantProductMapping";

@Index("PK_Variant", ["id"], { unique: true })
@Entity("Variant", { schema: "dbo" })
export class Variant {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("nvarchar", { name: "Name", length: 50 })
  name: string;

  @Column("nvarchar", { name: "Status", length: 50 })
  status: string;

  @Column("uniqueidentifier", { name: "BrandId" })
  brandId: string;

  @Column("nvarchar", { name: "Value", nullable: true })
  value: string | null;

  @Column("int", { name: "DisplayOrder", nullable: true })
  displayOrder: number | null;

  @OneToMany(
    () => VariantProductMapping,
    (variantProductMapping) => variantProductMapping.variant
  )
  variantProductMappings: VariantProductMapping[];
}
