import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Not,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { XSSRegExp } from '../../utils/regExp/XSS';

import { ForumMessage } from './ForumMessage';
import { User } from './User';

/** Модель Emoji
 * @property {number} id - id эмодзи, первичный ключ, автоинкремент
 * @property {number} author_id - id пользователя, который поставил эмодзи
 * @property {number} message_id - id сообщения, на которое поставили эмодзи
 * @property {string} emoji - эмодзи
 */

@Table({
  tableName: 'emojis',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    { unique: false, fields: ['author_id'] },
    { unique: false, fields: ['message_id'] },
  ],
})
export class Emoji extends Model<Emoji> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  override id!: number;

  @AllowNull(false)
  @Not(XSSRegExp)
  @Column(DataType.STRING)
  emoji!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  author_id!: number;

  @BelongsTo(() => User)
  author!: User;

  @ForeignKey(() => ForumMessage)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  message_id!: number;

  @BelongsTo(() => ForumMessage, {
    onDelete: 'CASCADE',
  })
  message!: ForumMessage;
}
