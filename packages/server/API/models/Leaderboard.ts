import { Column, DataType, Model, NotEmpty, PrimaryKey, Table, Unique } from 'sequelize-typescript';

/** Модель Leaderboard
 * @property {number} user_id - id пользователя, первичный ключ, уникальный
 * @property {number} score - количество очков пользователя
 */

@Table({ tableName: 'leaderboard', updatedAt: 'updated_at' })
export class Leaderboard extends Model<Leaderboard> {
  @PrimaryKey
  @Unique
  @NotEmpty
  @Column(DataType.INTEGER)
  user_id!: number;

  @Column(DataType.INTEGER)
  score!: number;
}
