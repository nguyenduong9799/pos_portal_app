import { Column, Entity, Index } from "typeorm";

@Index("PK___EFMigrationsHistory", ["migrationId"], { unique: true })
@Entity("__EFMigrationsHistory", { schema: "dbo" })
export class EfMigrationsHistory {
  @Column("nvarchar", { primary: true, name: "MigrationId", length: 150 })
  migrationId: string;

  @Column("nvarchar", { name: "ProductVersion", length: 32 })
  productVersion: string;
}
