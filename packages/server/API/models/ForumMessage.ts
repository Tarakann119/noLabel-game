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

import { Emoji } from './Emoji';
import { ForumTopic } from './ForumTopic';
import { User } from './User';

/** Модель ForumMessage
 * @property {number} id - id сообщения, первичный ключ, автоинкремент
 * @property {number} topic_id - id темы форума, к которой относится сообщение
 * @property {string} text - текст сообщения
 * @property {number} user_id - id пользователя, который написал сообщение
 */

@Table({
  tableName: 'forum_messages',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { unique: false, fields: ['topic_id'] },
    { unique: false, fields: ['author_id'] },
  ],
})
export class ForumMessage extends Model<ForumMessage> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  override id!: number;

  @AllowNull(false)
  @Not(XSSRegExp)
  @Column(DataType.STRING)
  text!: string;

  @ForeignKey(() => ForumTopic)
  @AllowNull(false)
  @Column
  topic_id!: number;

  @BelongsTo(() => ForumTopic, {
    onDelete: 'CASCADE',
  })
  topic!: ForumTopic;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  author_id!: number;

  @BelongsTo(() => User)
  author!: User;

  @HasMany(() => Emoji, 'message_id')
  emojis!: Emoji[];
}
