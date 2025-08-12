import { Column, Entity, Index } from 'typeorm';

@Index('PK_BlogPost', ['id'], { unique: true })
@Entity('BlogPost', { schema: 'dbo' })
export class BlogPost {
  @Column('uniqueidentifier', { primary: true, name: 'Id' })
  id: string;

  @Column('nvarchar', { name: 'Title', length: 150 })
  title: string;

  @Column('nvarchar', { name: 'BlogContent', nullable: true })
  blogContent: string | null;

  @Column('uniqueidentifier', { name: 'BrandId', nullable: true })
  brandId: string | null;

  @Column('nvarchar', { name: 'Image', nullable: true })
  image: string | null;

  @Column('bit', { name: 'IsDialog', nullable: true })
  isDialog: boolean | null;

  @Column('nvarchar', { name: 'MetaData', nullable: true })
  metaData: string | null;

  @Column('varchar', { name: 'Status', length: 50 })
  status: string;

  @Column('smallint', { name: 'Priority' })
  priority: number;

  @Column('varchar', { name: 'Type', nullable: true, length: 20 })
  type: string | null;
}
