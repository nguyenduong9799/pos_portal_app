import { Column, Entity, Index } from 'typeorm';

@Index('pk_payment', ['id'], { unique: true })
@Entity('payment', { schema: 'public' })
export class Payment {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('uuid', { name: 'order_id' })
  orderId: string;

  @Column('double precision', { name: 'amount' })
  amount: number;

  @Column('character', { name: 'currency_code', nullable: true, length: 10 })
  currencyCode: string | null;

  @Column('character varying', { name: 'notes', nullable: true, length: 250 })
  notes: string | null;

  @Column('timestamp without time zone', { name: 'pay_time', nullable: true })
  payTime: Date | null;

  @Column('character varying', { name: 'status', length: 10 })
  status: string;

  @Column('character varying', { name: 'type', length: 10 })
  type: string;

  @Column('uuid', { name: 'source_id', nullable: true })
  sourceId: string | null;
}
