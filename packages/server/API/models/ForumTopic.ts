import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
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
 * @property {User} author_id - автор темы
 */

@Table({
  tableName: 'forum_topics',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [{ unique: false, fields: ['author_id'] }],
})
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
  author_id!: number;

  @BelongsTo(() => User)
  author!: User;

  @HasOne(() => ForumMessage)
  last_message!: ForumMessage;
}
