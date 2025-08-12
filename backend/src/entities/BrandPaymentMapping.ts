import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Brand } from "./Brand";
import { PaymentType } from "./PaymentType";

@Index("BrandPaymentMapping_pk", ["id"], { unique: true })
@Entity("BrandPaymentMapping", { schema: "dbo" })
export class BrandPaymentMapping {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("int", { name: "DisplayOrder" })
  displayOrder: number;

  @Column("varchar", { name: "Status", length: 20 })
  status: string;

  @ManyToOne(() => Brand, (brand) => brand.brandPaymentMappings)
  @JoinColumn([{ name: "BrandId", referencedColumnName: "id" }])
  brand: Brand;

  @ManyToOne(
    () => PaymentType,
    (paymentType) => paymentType.brandPaymentMappings
  )
  @JoinColumn([{ name: "PaymentType", referencedColumnName: "type" }])
  paymentType: PaymentType;
}
