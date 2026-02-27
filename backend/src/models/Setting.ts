import {
  Table,
  Column,
  CreatedAt,
  UpdatedAt,
  Model,
  PrimaryKey,
  ForeignKey,
  AllowNull,
  BelongsTo,
  Unique
} from "sequelize-typescript";
import Tenant from "./Tenant";

@Table
class Setting extends Model<Setting> {
  @PrimaryKey
  @Column
  key: string;

  @ForeignKey(() => Tenant)
  @AllowNull(false)
  @Column
  tenantId: number;

  @BelongsTo(() => Tenant)
  tenant: Tenant;

  @Column
  value: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}

export default Setting;
