import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Menu } from "./Menu";
import { Store } from "./Store";

@Index("PK_MenuStore", ["id"], { unique: true })
@Entity("MenuStore", { schema: "dbo" })
export class MenuStore {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @ManyToOne(() => Menu, (menu) => menu.menuStores)
  @JoinColumn([{ name: "MenuId", referencedColumnName: "id" }])
  menu: Menu;

  @ManyToOne(() => Store, (store) => store.menuStores)
  @JoinColumn([{ name: "StoreId", referencedColumnName: "id" }])
  store: Store;
}
