import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Brand } from "./Brand";

@Index("BrandPartner_pk", ["id"], { unique: true })
@Entity("BrandPartner", { schema: "dbo" })
export class BrandPartner {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("float", { name: "DebtBalance", precision: 53 })
  debtBalance: number;

  @Column("datetime", { name: "CreatedAt" })
  createdAt: Date;

  @Column("datetime", { name: "UpdatedAt" })
  updatedAt: Date;

  @Column("varchar", { name: "Status", length: 20 })
  status: string;

  @Column("varchar", { name: "Type", length: 20 })
  type: string;

  @ManyToOne(() => Brand, (brand) => brand.brandPartners)
  @JoinColumn([{ name: "MasterBrandId", referencedColumnName: "id" }])
  masterBrand: Brand;

  @ManyToOne(() => Brand, (brand) => brand.brandPartners2)
  @JoinColumn([{ name: "BrandPartnerId", referencedColumnName: "id" }])
  brandPartner: Brand;
}
