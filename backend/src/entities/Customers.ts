import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./Orders";

@Entity("customers", { schema: "dbo" })
export class Customers {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "firstName", length: 100 })
  firstName: string;

  @Column("nvarchar", { name: "lastName", length: 100 })
  lastName: string;

  @Column("nvarchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("nvarchar", { name: "phone", nullable: true, length: 20 })
  phone: string | null;

  @Column("nvarchar", { name: "address", nullable: true, length: 500 })
  address: string | null;

  @Column("nvarchar", { name: "city", nullable: true, length: 100 })
  city: string | null;

  @Column("nvarchar", { name: "zipCode", nullable: true, length: 10 })
  zipCode: string | null;

  @Column("bit", { name: "isActive", default: () => "(1)" })
  isActive: boolean;

  @Column("datetime2", { name: "createdAt", default: () => "getdate()" })
  createdAt: Date;

  @Column("datetime2", { name: "updatedAt", default: () => "getdate()" })
  updatedAt: Date;

  @OneToMany(() => Orders, (orders) => orders.customer)
  orders: Orders[];
}
