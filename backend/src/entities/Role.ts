import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Account } from './Account';

@Index('pk_role_id', ['id'], { unique: true })
@Index('uq_role_id', ['id'], { unique: true })
@Entity('role', { schema: 'public' })
export class Role {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'name', length: 20 })
  name: string;

  @OneToMany(() => Account, (account) => account.role)
  accounts: Account[];
}
