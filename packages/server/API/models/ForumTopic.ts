import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Not,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { XSSRegExp } from '../../utils/regExp/XSS';

import { ForumMessage } from './ForumMessage';
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
  @Not(XSSRegExp)
  @Column(DataType.STRING)
  title!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  author!: number;

  @BelongsTo(() => User)
  author_full_data!: User;

  @HasMany(() => ForumMessage)
  messages!: ForumMessage[];
  last_message!: ForumMessage;
}
