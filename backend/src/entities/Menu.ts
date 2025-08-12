import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Brand } from "./Brand";
import { MenuProduct } from "./MenuProduct";
import { MenuStore } from "./MenuStore";

@Index("PK_Menu_Id", ["id"], { unique: true })
@Index("UX_Menu_Code", ["code"], { unique: true })
@Entity("Menu", { schema: "dbo" })
export class Menu {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("nvarchar", { name: "Code", unique: true, length: 20 })
  code: string;

  @Column("nvarchar", { name: "CreatedBy", nullable: true, length: 50 })
  createdBy: string | null;

  @Column("datetime2", { name: "CreatedAt", nullable: true })
  createdAt: Date | null;

  @Column("nvarchar", { name: "UpdatedBy", nullable: true, length: 50 })
  updatedBy: string | null;

  @Column("datetime2", { name: "UpdatedAt", nullable: true })
  updatedAt: Date | null;

  @Column("int", { name: "Priority" })
  priority: number;

  @Column("int", { name: "DateFilter" })
  dateFilter: number;

  @Column("int", { name: "StartTime" })
  startTime: number;

  @Column("int", { name: "EndTime" })
  endTime: number;

  @Column("nvarchar", { name: "Status", length: 20 })
  status: string;

  @ManyToOne(() => Brand, (brand) => brand.menus)
  @JoinColumn([{ name: "BrandId", referencedColumnName: "id" }])
  brand: Brand;

  @OneToMany(() => MenuProduct, (menuProduct) => menuProduct.menu)
  menuProducts: MenuProduct[];

  @OneToMany(() => MenuStore, (menuStore) => menuStore.menu)
  menuStores: MenuStore[];
}
