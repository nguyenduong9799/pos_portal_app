import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Brand } from "./Brand";
import { CollectionProduct } from "./CollectionProduct";

@Index("PK_Collection_Id", ["id"], { unique: true })
@Entity("Collection", { schema: "dbo" })
export class Collection {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("nvarchar", { name: "Name", length: 50 })
  name: string;

  @Column("nvarchar", { name: "Code", length: 20 })
  code: string;

  @Column("nvarchar", { name: "Status", length: 20 })
  status: string;

  @Column("nvarchar", { name: "Description", nullable: true, length: 100 })
  description: string | null;

  @Column("nvarchar", { name: "PicUrl", nullable: true })
  picUrl: string | null;

  @ManyToOne(() => Brand, (brand) => brand.collections)
  @JoinColumn([{ name: "BrandId", referencedColumnName: "id" }])
  brand: Brand;

  @OneToMany(
    () => CollectionProduct,
    (collectionProduct) => collectionProduct.collection
  )
  collectionProducts: CollectionProduct[];
}
