import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  PrimaryKey,
  AutoIncrement,
  Unique,
  HasMany,
  AllowNull
} from "sequelize-typescript";
import User from "./User";
import Queue from "./Queue";
import Whatsapp from "./Whatsapp";
import Contact from "./Contact";

@Table
class Tenant extends Model<Tenant> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Unique
  @Column
  name: string; // ej: "empresa-xyz"

  @AllowNull(false)
  @Column
  displayName: string; // ej: "Empresa XYZ"

  @Column
  logo: string;

  @Column
  domain: string; // ej: "xyz.whaticket.com" (opcional)

  @AllowNull(false)
  @Column
  status: string; // "active", "suspended", "deleted"

  @AllowNull(false)
  @Column
  plan: string; // "free", "professional", "enterprise"

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  // Relaciones
  @HasMany(() => User)
  users: User[];

  @HasMany(() => Queue)
  queues: Queue[];

  @HasMany(() => Whatsapp)
  whatsapps: Whatsapp[];

  @HasMany(() => Contact)
  contacts: Contact[];
}

export default Tenant;
