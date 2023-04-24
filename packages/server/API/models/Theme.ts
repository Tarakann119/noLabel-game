import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  IsIn,
  Model,
  NotEmpty,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { User } from './User';

/** Модель Theme
 * @property {number} id - id пользователя, первичный ключ, уникальный
 * @property {string} theme - тема оформления, может быть 'dark' или 'light'
 */

@Table({
  tableName: 'themes',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Theme extends Model<Theme> {
  @PrimaryKey
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  override id!: number;

  @IsIn([['dark', 'light']])
  @NotEmpty
  @Column(DataType.STRING)
  theme!: string;
}
