import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Menu } from "./Menu";
import { Product } from "./Product";
import { OrderDetail } from "./OrderDetail";

@Index("Pk_MenuProdudct_Id", ["id"], { unique: true })
@Entity("MenuProduct", { schema: "dbo" })
export class MenuProduct {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("nvarchar", { name: "Status", length: 20 })
  status: string;

  @Column("float", { name: "SellingPrice", precision: 53 })
  sellingPrice: number;

  @Column("float", { name: "DiscountPrice", precision: 53 })
  discountPrice: number;

  @Column("float", { name: "HistoricalPrice", precision: 53 })
  historicalPrice: number;

  @Column("nvarchar", { name: "CreatedBy", nullable: true, length: 50 })
  createdBy: string | null;

  @Column("datetime2", { name: "CreatedAt", nullable: true })
  createdAt: Date | null;

  @Column("nvarchar", { name: "UpdatedBy", nullable: true, length: 50 })
  updatedBy: string | null;

  @Column("datetime2", { name: "UpdatedAt", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => Menu, (menu) => menu.menuProducts)
  @JoinColumn([{ name: "MenuId", referencedColumnName: "id" }])
  menu: Menu;

  @ManyToOne(() => Product, (product) => product.menuProducts)
  @JoinColumn([{ name: "ProductId", referencedColumnName: "id" }])
  product: Product;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.menuProduct)
  orderDetails: OrderDetail[];
}
