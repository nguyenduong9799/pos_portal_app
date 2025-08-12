import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Collection } from "./Collection";
import { Product } from "./Product";

@Index("PK_CollectionProduct_Id", ["id"], { unique: true })
@Entity("CollectionProduct", { schema: "dbo" })
export class CollectionProduct {
  @Column("uniqueidentifier", { primary: true, name: "Id" })
  id: string;

  @Column("nvarchar", { name: "Status", length: 20 })
  status: string;

  @ManyToOne(() => Collection, (collection) => collection.collectionProducts)
  @JoinColumn([{ name: "CollectionId", referencedColumnName: "id" }])
  collection: Collection;

  @ManyToOne(() => Product, (product) => product.collectionProducts)
  @JoinColumn([{ name: "ProductId", referencedColumnName: "id" }])
  product: Product;
}
