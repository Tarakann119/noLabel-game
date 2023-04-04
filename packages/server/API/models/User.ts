import { AllowNull, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

/** Модель User */
@Table({ tableName: 'users', createdAt: 'created_at', updatedAt: 'updated_at' })
export class User extends Model<User> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  ya_id!: number;

  @AllowNull(false)
  @Column
  login!: string;

  @Column
  first_name!: string;

  @Column
  second_name!: string;

  @Column
  avatar!: string;
}
