import { Column, Entity, Index } from "typeorm";

@Index("PK_VariantOption", ["id"], { unique: true })
@Entity("VariantOptions", { schema: "dbo" })
export class VariantOptions {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("nvarchar", { name: "OptionName", length: 200 })
  optionName: string;

  @Column("uniqueidentifier", { name: "VariantId" })
  variantId: string;
}
