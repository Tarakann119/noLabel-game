import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Not,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { XSSRegExp } from '../../utils/regExp/XSS';

import { Emoji } from './Emoji';
import { ForumMessage } from './ForumMessage';
import { ForumTopic } from './ForumTopic';
import { Leaderboard } from './Leaderboard';
import { Theme } from './Theme';

/** Модель User
 * @property {number} id - id пользователя, первичный ключ, уникальный
 * @property {string} first_name - имя пользователя
 * @property {string} second_name - фамилия пользователя
 * @property {string} login - логин пользователя, необязательное поле
 * @property {string} email - email пользователя, необязательное поле
 * @property {string} phone - телефон пользователя, необязательное поле
 * @property {string} avatar - ссылка на аватар пользователя, необязательное поле
 */

@Table({
  tableName: 'users',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class User extends Model<User> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  override id!: number;

  // @Is(nameRegExp)
  @Column(DataType.STRING)
  first_name!: string;

  // @Is(nameRegExp)
  @Column(DataType.STRING)
  second_name!: string;

  // @Is(loginRegExp)
  // @Unique
  @Column(DataType.STRING)
  login?: string;

  // @IsEmail
  // @Unique
  @Column(DataType.STRING)
  email?: string;

  // @Is(phoneRegExp)
  // @Unique
  @Column(DataType.STRING)
  phone?: string;

  @Not(XSSRegExp)
  @Column(DataType.STRING)
  avatar?: string;

  @HasOne(() => Leaderboard)
  leaderboard!: Leaderboard;

  @HasOne(() => Theme)
  theme!: Theme;

  @HasMany(() => ForumTopic, 'author_id')
  topics!: ForumTopic[];

  @HasMany(() => ForumMessage, 'author_id')
  messages!: ForumMessage[];

  @HasMany(() => Emoji, 'author_id')
  emojis!: Emoji[];
}
