import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Brand } from './Brand';
import { MenuProduct } from './MenuProduct';
import { MenuStore } from './MenuStore';

@Index('idx_menu_brand_id', ['brandId'], {})
@Index('ux_menu_code', ['code'], { unique: true })
@Index('pk_menu_id', ['id'], { unique: true })
@Entity('menu', { schema: 'public' })
export class Menu {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'code', unique: true, length: 20 })
  code: string;

  @Column('character varying', {
    name: 'created_by',
    nullable: true,
    length: 50,
  })
  createdBy: string | null;

  @Column('timestamp without time zone', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('character varying', {
    name: 'updated_by',
    nullable: true,
    length: 50,
  })
  updatedBy: string | null;

  @Column('timestamp without time zone', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('integer', { name: 'priority' })
  priority: number;

  @Column('integer', { name: 'date_filter' })
  dateFilter: number;

  @Column('integer', { name: 'start_time' })
  startTime: number;

  @Column('integer', { name: 'end_time' })
  endTime: number;

  @Column('character varying', { name: 'status', length: 20 })
  status: string;

  @Column('uuid', { name: 'brand_id' })
  brandId: string;

  @ManyToOne(() => Brand, (brand) => brand.menus)
  @JoinColumn([{ name: 'brand_id', referencedColumnName: 'id' }])
  brand: Brand;

  @OneToMany(() => MenuProduct, (menuProduct) => menuProduct.menu)
  menuProducts: MenuProduct[];

  @OneToMany(() => MenuStore, (menuStore) => menuStore.menu)
  menuStores: MenuStore[];
}
