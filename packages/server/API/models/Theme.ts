import {
  Column,
  DataType,
  Equals,
  Model,
  NotEmpty,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

/** Модель Theme
 * @property {number} user_id - id пользователя, первичный ключ, уникальный
 * @property {string} theme - тема оформления, может быть 'dark' или 'light'
 */

@Table({
  tableName: 'themes',
  timestamps: false,
})
export class Theme extends Model<Theme> {
  @PrimaryKey
  @Unique
  @NotEmpty
  @Column(DataType.INTEGER)
  user_id!: number;

  @Equals('dark' || 'light')
  @NotEmpty
  @Column(DataType.STRING)
  theme!: string;
}
