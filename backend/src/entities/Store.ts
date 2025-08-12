import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Category } from "./Category";
import { MenuStore } from "./MenuStore";
import { Session } from "./Session";
import { Brand } from "./Brand";
import { StoreAccount } from "./StoreAccount";

@Index("PK_StoreId", ["id"], { unique: true })
@Index("UX_Store_StoreCode", ["code"], { unique: true })
@Entity("Store", { schema: "dbo" })
export class Store {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("nvarchar", { name: "Name", length: 50 })
  name: string;

  @Column("nvarchar", { name: "ShortName", length: 30 })
  shortName: string;

  @Column("nvarchar", { name: "Email", length: 254 })
  email: string;

  @Column("varchar", { name: "Phone", length: 20 })
  phone: string;

  @Column("nvarchar", { name: "Code", length: 20 })
  code: string;

  @Column("nvarchar", { name: "Status", length: 20 })
  status: string;

  @Column("nvarchar", { name: "Address", nullable: true, length: 256 })
  address: string | null;

  @Column("nvarchar", { name: "WifiName", nullable: true, length: 100 })
  wifiName: string | null;

  @Column("nvarchar", { name: "WifiPassword", nullable: true, length: 50 })
  wifiPassword: string | null;

  @Column("nvarchar", { name: "Lat", nullable: true, length: 256 })
  lat: string | null;

  @Column("nvarchar", { name: "Long", nullable: true, length: 256 })
  long: string | null;

  @Column("int", { name: "Index", nullable: true })
  index: number | null;

  @Column("nvarchar", { name: "LocationNearby", nullable: true })
  locationNearby: string | null;

  @Column("varchar", { name: "LocalPassCode", nullable: true, length: 200 })
  localPassCode: string | null;

  @ManyToMany(() => Category, (category) => category.stores)
  @JoinTable({
    name: "CategoryStoreMapping",
    joinColumns: [{ name: "StoreId", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "CategoryId", referencedColumnName: "id" }],
    schema: "dbo",
  })
  categories: Category[];

  @OneToMany(() => MenuStore, (menuStore) => menuStore.store)
  menuStores: MenuStore[];

  @OneToMany(() => Session, (session) => session.store)
  sessions: Session[];

  @ManyToOne(() => Brand, (brand) => brand.stores)
  @JoinColumn([{ name: "BrandId", referencedColumnName: "id" }])
  brand: Brand;

  @OneToMany(() => StoreAccount, (storeAccount) => storeAccount.store)
  storeAccounts: StoreAccount[];
}
