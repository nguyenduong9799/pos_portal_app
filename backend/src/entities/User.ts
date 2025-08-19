import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Brand } from './Brand';

@Index('idx_user_brand_id', ['brandId'], {})
@Index('user_pk', ['id'], { unique: true })
@Entity('user', { schema: 'public' })
export class User {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'phone_number', length: 20 })
  phoneNumber: string;

  @Column('character varying', {
    name: 'full_name',
    nullable: true,
    length: 50,
  })
  fullName: string | null;

  @Column('character varying', { name: 'gender', nullable: true, length: 10 })
  gender: string | null;

  @Column('character varying', { name: 'email', nullable: true, length: 100 })
  email: string | null;

  @Column('character varying', { name: 'status', length: 10 })
  status: string;

  @Column('character varying', { name: 'fire_base_uid', length: 50 })
  fireBaseUid: string;

  @Column('text', { name: 'fcm_token', nullable: true })
  fcmToken: string | null;

  @Column('uuid', { name: 'brand_id' })
  brandId: string;

  @Column('timestamp without time zone', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp without time zone', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('text', { name: 'url_img', nullable: true })
  urlImg: string | null;

  @Column('character varying', {
    name: 'pin_code',
    nullable: true,
    length: 100,
  })
  pinCode: string | null;

  @ManyToOne(() => Brand, (brand) => brand.users)
  @JoinColumn([{ name: 'brand_id', referencedColumnName: 'id' }])
  brand: Brand;
}
