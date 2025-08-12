import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ length: 20 })
  method: string; // cash, credit_card, debit_card, mobile_payment

  @Column({ length: 20, default: 'completed' })
  status: string; // pending, completed, failed, refunded

  @Column({ length: 100, nullable: true })
  transactionId: string;

  @Column({ length: 500, nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Order, order => order.payment)
  @JoinColumn()
  order: Order;
}