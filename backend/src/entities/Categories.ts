import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./Products";

@Index("UQ_8b0be371d28245da6e4f4b61878", ["name"], { unique: true })
@Entity("categories", { schema: "dbo" })
export class Categories {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "name", unique: true, length: 100 })
  name: string;

  @Column("nvarchar", { name: "description", nullable: true, length: 500 })
  description: string | null;

  @Column("nvarchar", { name: "imageUrl", nullable: true, length: 500 })
  imageUrl: string | null;

  @Column("bit", { name: "isActive", default: () => "(1)" })
  isActive: boolean;

  @Column("datetime2", { name: "createdAt", default: () => "getdate()" })
  createdAt: Date;

  @Column("datetime2", { name: "updatedAt", default: () => "getdate()" })
  updatedAt: Date;

  @OneToMany(() => Products, (products) => products.category)
  products: Products[];
}
