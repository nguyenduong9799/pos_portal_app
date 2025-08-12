import { Column, Entity, Index, OneToMany } from "typeorm";
import { BrandPaymentMapping } from "./BrandPaymentMapping";

@Index("PaymentType_pk", ["type"], { unique: true })
@Entity("PaymentType", { schema: "dbo" })
export class PaymentType {
  @Column("varchar", { primary: true, name: "Type", length: 20 })
  type: string;

  @Column("nvarchar", { name: "Name", length: 100 })
  name: string;

  @Column("varchar", { name: "PicUrl" })
  picUrl: string;

  @Column("varchar", { name: "PaymentCode", length: 20 })
  paymentCode: string;

  @Column("varchar", { name: "Status", length: 20 })
  status: string;

  @OneToMany(
    () => BrandPaymentMapping,
    (brandPaymentMapping) => brandPaymentMapping.paymentType
  )
  brandPaymentMappings: BrandPaymentMapping[];
}
