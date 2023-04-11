import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { ForumMessage } from './ForumMessage';
import { User } from './User';

/** Модель Emoji
 * @property {number} id - id эмодзи, первичный ключ, автоинкремент
 * @property {number} user_id - id пользователя, который поставил эмодзи
 * @property {number} message_id - id сообщения, на которое поставили эмодзи
 * @property {string} emoji - эмодзи
 */

@Table({
  tableName: 'emojis',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Emoji extends Model<Emoji> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  override id!: number;

  @ForeignKey(() => User)
  @Column
  user_id!: number;

  @ForeignKey(() => ForumMessage)
  @Column
  message_id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  emoji!: string;
}
