import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { User } from './User';

/** Модель ForumTopic
 * @property {number} id - id темы, первичный ключ, автоинкремент
 * @property {string} title - заголовок темы форума
 * @property {number} lastMessage_id - id последнего сообщения в теме
 * @property {User} author - автор темы
 */

@Table({ tableName: 'forum_topics', createdAt: 'created_at', updatedAt: 'updated_at' })
export class ForumTopic extends Model<ForumTopic> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  override id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.INTEGER)
  lastMessage_id!: number;

  @BelongsTo(() => User, 'user_id')
  author!: User;
}
