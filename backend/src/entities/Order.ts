import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Account } from './Account';
import { OrderUser } from './OrderUser';
import { Session } from './Session';
import { OrderDetail } from './OrderDetail';
import { OrderHistory } from './OrderHistory';
import { PromotionOrderMapping } from './PromotionOrderMapping';

@Index('pk_order_id', ['id'], { unique: true })
@Index('uq_order_invoice_id', ['invoiceId'], { unique: true })
@Index('idx_order_session_id', ['sessionId'], {})
@Entity('order', { schema: 'public' })
export class Order {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('timestamp without time zone', { name: 'check_in_date' })
  checkInDate: Date;

  @Column('timestamp without time zone', { name: 'check_out_date' })
  checkOutDate: Date;

  @Column('character varying', { name: 'invoice_id', unique: true, length: 50 })
  invoiceId: string;

  @Column('double precision', { name: 'total_amount' })
  totalAmount: number;

  @Column('double precision', { name: 'discount' })
  discount: number;

  @Column('double precision', { name: 'final_amount' })
  finalAmount: number;

  @Column('double precision', { name: 'vat' })
  vat: number;

  @Column('double precision', { name: 'vat_amount' })
  vatAmount: number;

  @Column('character varying', {
    name: 'order_type',
    nullable: true,
    length: 20,
  })
  orderType: string | null;

  @Column('integer', { name: 'number_of_guest', nullable: true })
  numberOfGuest: number | null;

  @Column('character varying', { name: 'status', length: 20 })
  status: string;

  @Column('text', { name: 'note', nullable: true })
  note: string | null;

  @Column('double precision', {
    name: 'fee_amount',
    nullable: true,
  })
  feeAmount: number | null;

  @Column('character varying', {
    name: 'fee_description',
    nullable: true,
    length: 50,
  })
  feeDescription: string | null;

  @Column('uuid', { name: 'session_id' })
  sessionId: string;

  @Column('character varying', {
    name: 'payment_type',
    nullable: true,
    length: 50,
  })
  paymentType: string | null;

  @ManyToOne(() => Account, (account) => account.orders)
  @JoinColumn([{ name: 'check_in_person', referencedColumnName: 'id' }])
  checkInPerson: Account;

  @ManyToOne(() => OrderUser, (orderUser) => orderUser.orders)
  @JoinColumn([{ name: 'order_source_id', referencedColumnName: 'id' }])
  orderSource: OrderUser;

  @ManyToOne(() => Session, (session) => session.orders)
  @JoinColumn([{ name: 'session_id', referencedColumnName: 'id' }])
  session: Session;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];

  @OneToMany(() => OrderHistory, (orderHistory) => orderHistory.order)
  orderHistories: OrderHistory[];

  @OneToMany(
    () => PromotionOrderMapping,
    (promotionOrderMapping) => promotionOrderMapping.order,
  )
  promotionOrderMappings: PromotionOrderMapping[];
}
