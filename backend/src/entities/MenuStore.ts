import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Menu } from './Menu';
import { Store } from './Store';

@Index('pk_menu_store', ['id'], { unique: true })
@Entity('menu_store', { schema: 'public' })
export class MenuStore {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @ManyToOne(() => Menu, (menu) => menu.menuStores)
  @JoinColumn([{ name: 'menu_id', referencedColumnName: 'id' }])
  menu: Menu;

  @ManyToOne(() => Store, (store) => store.menuStores)
  @JoinColumn([{ name: 'store_id', referencedColumnName: 'id' }])
  store: Store;
}
