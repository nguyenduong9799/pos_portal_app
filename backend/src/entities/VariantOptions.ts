import { Column, Entity, Index } from "typeorm";

@Index("pk_variant_option", ["id"], { unique: true })
@Entity("variant_options", { schema: "public" })
export class VariantOptions {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "option_name", length: 200 })
  optionName: string;

  @Column("uuid", { name: "variant_id" })
  variantId: string;
}
