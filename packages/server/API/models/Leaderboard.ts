import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { User } from './User';

/** Модель Leaderboard
 * @property {number} user_id - id пользователя, первичный ключ, уникальный
 * @property {number} score - количество очков пользователя
 */

@Table({ tableName: 'leaderboard', updatedAt: 'updated_at' })
export class Leaderboard extends Model<Leaderboard> {
  @PrimaryKey
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id!: number;

  @Column(DataType.INTEGER)
  score!: number;

  @BelongsTo(() => User)
  user!: User;
}
