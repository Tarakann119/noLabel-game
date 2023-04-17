import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Is,
  IsEmail,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

import { loginRegExp, nameRegExp, phoneRegExp } from '../../utils/regExp/validation';
import { SQLRegExp, XSSRegExp } from '../../utils/regExp/XSS';

import { Emoji } from './Emoji';
import { ForumMessage } from './ForumMessage';
import { ForumTopic } from './ForumTopic';
import { Leaderboard } from './Leaderboard';
import { Theme } from './Theme';

/** Модель User
 * @property {number} user_id - id пользователя, первичный ключ, уникальный
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
  @Unique
  @Is([loginRegExp, SQLRegExp, XSSRegExp])
  @Column(DataType.INTEGER)
  user_id!: number;

  @Is([nameRegExp, SQLRegExp, XSSRegExp])
  @Column(DataType.STRING)
  first_name!: string;

  @Is([nameRegExp, SQLRegExp, XSSRegExp])
  @Column(DataType.STRING)
  second_name!: string;

  @Is([loginRegExp, SQLRegExp, XSSRegExp])
  @Column(DataType.STRING)
  login?: string;

  @IsEmail
  @Is([SQLRegExp, XSSRegExp])
  @Column(DataType.STRING)
  email?: string;

  @Is([phoneRegExp, SQLRegExp, XSSRegExp])
  @Column(DataType.STRING)
  phone?: string;

  @Is([SQLRegExp, XSSRegExp])
  @Column(DataType.STRING)
  avatar?: string;

  @HasOne(() => Leaderboard)
  leaderboard!: Leaderboard;

  @HasOne(() => Theme)
  theme!: Theme;

  @HasMany(() => ForumTopic, 'author')
  topics!: ForumTopic[];

  @HasMany(() => ForumMessage, 'author')
  messages!: ForumMessage[];

  @HasMany(() => Emoji, 'author')
  emojis!: Emoji[];
}
