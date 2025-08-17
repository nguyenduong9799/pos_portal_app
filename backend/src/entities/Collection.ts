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

@Index("idx_collection_brand_id", ["brandId"], {})
@Index("pk_collection_id", ["id"], { unique: true })
@Entity("collection", { schema: "public" })
export class Collection {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "name", length: 50 })
  name: string;

  @Column("character varying", { name: "code", length: 20 })
  code: string;

  @Column("character varying", { name: "status", length: 20 })
  status: string;

  @Column("character varying", {
    name: "description",
    nullable: true,
    length: 100,
  })
  description: string | null;

  @Column("text", { name: "pic_url", nullable: true })
  picUrl: string | null;

  @Column("uuid", { name: "brand_id" })
  brandId: string;

  @ManyToOne(() => Brand, (brand) => brand.collections)
  @JoinColumn([{ name: "brand_id", referencedColumnName: "id" }])
  brand: Brand;

  @OneToMany(
    () => CollectionProduct,
    (collectionProduct) => collectionProduct.collection
  )
  collectionProducts: CollectionProduct[];
}
