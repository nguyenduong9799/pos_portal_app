import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Category } from "./Category";
import { MenuStore } from "./MenuStore";
import { Session } from "./Session";
import { Brand } from "./Brand";
import { StoreAccount } from "./StoreAccount";

@Index("idx_store_brand_id", ["brandId"], {})
@Index("ux_store_store_code", ["code"], { unique: true })
@Index("pk_store_id", ["id"], { unique: true })
@Entity("store", { schema: "public" })
export class Store {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "name", length: 50 })
  name: string;

  @Column("character varying", { name: "short_name", length: 30 })
  shortName: string;

  @Column("character varying", { name: "email", length: 254 })
  email: string;

  @Column("character varying", { name: "phone", length: 20 })
  phone: string;

  @Column("character varying", { name: "code", length: 20 })
  code: string;

  @Column("character varying", { name: "status", length: 20 })
  status: string;

  @Column("uuid", { name: "brand_id" })
  brandId: string;

  @Column("character varying", { name: "address", nullable: true, length: 256 })
  address: string | null;

  @Column("character varying", {
    name: "wifi_name",
    nullable: true,
    length: 100,
  })
  wifiName: string | null;

  @Column("character varying", {
    name: "wifi_password",
    nullable: true,
    length: 50,
  })
  wifiPassword: string | null;

  @Column("character varying", { name: "lat", nullable: true, length: 256 })
  lat: string | null;

  @Column("character varying", { name: "long", nullable: true, length: 256 })
  long: string | null;

  @Column("integer", { name: "index", nullable: true })
  index: number | null;

  @Column("text", { name: "location_nearby", nullable: true })
  locationNearby: string | null;

  @Column("character varying", {
    name: "local_pass_code",
    nullable: true,
    length: 200,
  })
  localPassCode: string | null;

  @ManyToMany(() => Category, (category) => category.stores)
  categories: Category[];

  @OneToMany(() => MenuStore, (menuStore) => menuStore.store)
  menuStores: MenuStore[];

  @OneToMany(() => Session, (session) => session.store)
  sessions: Session[];

  @ManyToOne(() => Brand, (brand) => brand.stores)
  @JoinColumn([{ name: "brand_id", referencedColumnName: "id" }])
  brand: Brand;

  @OneToMany(() => StoreAccount, (storeAccount) => storeAccount.store)
  storeAccounts: StoreAccount[];
}
