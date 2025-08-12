import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderItems } from "./OrderItems";
import { Categories } from "./Categories";

@Index("UQ_c44ac33a05b144dd0d9ddcf9327", ["sku"], { unique: true })
@Entity("products", { schema: "dbo" })
export class Products {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "name", length: 200 })
  name: string;

  @Column("nvarchar", { name: "description", nullable: true, length: 500 })
  description: string | null;

  @Column("nvarchar", { name: "sku", unique: true, length: 100 })
  sku: string;

  @Column("decimal", { name: "price", precision: 10, scale: 2 })
  price: number;

  @Column("decimal", {
    name: "cost",
    precision: 10,
    scale: 2,
    default: () => "(0)",
  })
  cost: number;

  @Column("int", { name: "stockQuantity", default: () => "(0)" })
  stockQuantity: number;

  @Column("int", { name: "minimumStock", default: () => "(0)" })
  minimumStock: number;

  @Column("nvarchar", { name: "imageUrl", nullable: true, length: 500 })
  imageUrl: string | null;

  @Column("bit", { name: "isActive", default: () => "(1)" })
  isActive: boolean;

  @Column("datetime2", { name: "createdAt", default: () => "getdate()" })
  createdAt: Date;

  @Column("datetime2", { name: "updatedAt", default: () => "getdate()" })
  updatedAt: Date;

  @OneToMany(() => OrderItems, (orderItems) => orderItems.product)
  orderItems: OrderItems[];

  @ManyToOne(() => Categories, (categories) => categories.products)
  @JoinColumn([{ name: "categoryId", referencedColumnName: "id" }])
  category: Categories;
}
