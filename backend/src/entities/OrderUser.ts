import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Order } from './Order';

@Index('pk_order_source_id', ['id'], { unique: true })
@Entity('order_user', { schema: 'public' })
export class OrderUser {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', {
    name: 'user_type',
    nullable: true,
    length: 50,
  })
  userType: string | null;

  @Column('character varying', { name: 'address', nullable: true, length: 500 })
  address: string | null;

  @Column('character varying', { name: 'status', length: 50 })
  status: string;

  @Column('timestamp without time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'completed_at',
    nullable: true,
  })
  completedAt: Date | null;

  @Column('uuid', { name: 'user_id', nullable: true })
  userId: string | null;

  @Column('character varying', { name: 'note', nullable: true, length: 256 })
  note: string | null;

  @Column('character varying', { name: 'name', nullable: true, length: 100 })
  name: string | null;

  @Column('character varying', { name: 'phone', nullable: true, length: 20 })
  phone: string | null;

  @Column('character varying', {
    name: 'payment_status',
    nullable: true,
    length: 10,
  })
  paymentStatus: string | null;

  @Column('boolean', { name: 'is_sync', nullable: true })
  isSync: boolean | null;

  @OneToMany(() => Order, (order) => order.orderSource)
  orders: Order[];
}
