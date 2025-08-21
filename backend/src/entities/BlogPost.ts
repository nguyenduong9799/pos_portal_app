import { Column, Entity, Index } from 'typeorm';

@Index('pk_blog_post', ['id'], { unique: true })
@Entity('blog_post', { schema: 'public' })
export class BlogPost {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'title', length: 150 })
  title: string;

  @Column('text', { name: 'blog_content', nullable: true })
  blogContent: string | null;

  @Column('uuid', { name: 'brand_id', nullable: true })
  brandId: string | null;

  @Column('text', { name: 'image', nullable: true })
  image: string | null;

  @Column('boolean', { name: 'is_dialog', nullable: true })
  isDialog: boolean | null;

  @Column('text', { name: 'meta_data', nullable: true })
  metaData: string | null;

  @Column('character varying', { name: 'status', length: 50 })
  status: string;

  @Column('smallint', { name: 'priority' })
  priority: number;

  @Column('character varying', { name: 'type', nullable: true, length: 20 })
  type: string | null;
}
