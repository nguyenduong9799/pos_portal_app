import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./Orders";

@Index("UQ_fe0bb3f6520ee0469504521e710", ["username"], { unique: true })
@Entity("users", { schema: "dbo" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "username", unique: true, length: 100 })
  username: string;

  @Column("nvarchar", { name: "email", length: 255 })
  email: string;

  @Column("nvarchar", { name: "password", length: 255 })
  password: string;

  @Column("nvarchar", { name: "firstName", length: 100 })
  firstName: string;

  @Column("nvarchar", { name: "lastName", length: 100 })
  lastName: string;

  @Column("nvarchar", { name: "role", length: 20, default: () => "'employee'" })
  role: string;

  @Column("bit", { name: "isActive", default: () => "(1)" })
  isActive: boolean;

  @Column("datetime2", { name: "createdAt", default: () => "getdate()" })
  createdAt: Date;

  @Column("datetime2", { name: "updatedAt", default: () => "getdate()" })
  updatedAt: Date;

  @OneToMany(() => Orders, (orders) => orders.user)
  orders: Orders[];
}
