import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Order } from './Order';
import { Store } from './Store';

@Index('pk_session_id', ['id'], { unique: true })
@Entity('session', { schema: 'public' })
export class Session {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('timestamp without time zone', { name: 'start_date_time' })
  startDateTime: Date;

  @Column('timestamp without time zone', { name: 'end_date_time' })
  endDateTime: Date;

  @Column('integer', { name: 'number_of_orders' })
  numberOfOrders: number;

  @Column('double precision', {
    name: 'total_amount',
    nullable: true,
  })
  totalAmount: number | null;

  @Column('integer', { name: 'total_promotion', nullable: true })
  totalPromotion: number | null;

  @Column('double precision', {
    name: 'total_change_cash',
    nullable: true,
  })
  totalChangeCash: number | null;

  @Column('double precision', {
    name: 'total_discount_amount',
    nullable: true,
  })
  totalDiscountAmount: number | null;

  @Column('double precision', {
    name: 'total_final_amount',
    nullable: true,
  })
  totalFinalAmount: number | null;

  @Column('character varying', {
    name: 'name',
    nullable: true,
    length: 50,
    default: () => 'NULL::character varying',
  })
  name: string | null;

  @OneToMany(() => Order, (order) => order.session)
  orders: Order[];

  @ManyToOne(() => Store, (store) => store.sessions)
  @JoinColumn([{ name: 'store_id', referencedColumnName: 'id' }])
  store: Store;
}
