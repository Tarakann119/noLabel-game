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

/** Модель Theme */
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
