import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Brand } from "./Brand";

@Index("User_pk", ["id"], { unique: true })
@Entity("User", { schema: "dbo" })
export class User {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("varchar", { name: "PhoneNumber", length: 20 })
  phoneNumber: string;

  @Column("nvarchar", { name: "FullName", nullable: true, length: 50 })
  fullName: string | null;

  @Column("varchar", { name: "Gender", nullable: true, length: 10 })
  gender: string | null;

  @Column("varchar", { name: "Email", nullable: true, length: 100 })
  email: string | null;

  @Column("varchar", { name: "Status", length: 10 })
  status: string;

  @Column("varchar", { name: "FireBaseUID", length: 50 })
  fireBaseUid: string;

  @Column("varchar", { name: "FCMToken", nullable: true })
  fcmToken: string | null;

  @Column("datetime", { name: "CreatedAt", nullable: true })
  createdAt: Date | null;

  @Column("datetime", { name: "UpdatedAt", nullable: true })
  updatedAt: Date | null;

  @Column("varchar", { name: "UrlImg", nullable: true })
  urlImg: string | null;

  @Column("varchar", { name: "PinCode", nullable: true, length: 100 })
  pinCode: string | null;

  @ManyToOne(() => Brand, (brand) => brand.users)
  @JoinColumn([{ name: "BrandId", referencedColumnName: "id" }])
  brand: Brand;
}
