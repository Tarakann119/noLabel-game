import {
  Column,
  DataType,
  Is,
  IsEmail,
  IsUrl,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

/** RegExp для валидации phone */
const phoneRegExp = /^[\d\\+][\d\\(\\)\\ -]{9,14}\d$/;

/** RegExp для валидации login */
const loginRegExp = /^[a-z0-9_-]{2,19}$/;

/** RegExp для валидации first_name и second_name */
const nameRegExp = /^[a-zA-Zа-яА-Я][a-zA-Za-яА-Я-\\.]{1,20}$/g;

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
  @Is(loginRegExp)
  @Column(DataType.INTEGER)
  user_id!: number;

  @Is(nameRegExp)
  @Column(DataType.STRING)
  first_name!: string;

  @Is(nameRegExp)
  @Column(DataType.STRING)
  second_name!: string;

  @Is(loginRegExp)
  @Column(DataType.STRING)
  login?: string;

  @IsEmail
  @Column(DataType.STRING)
  email?: string;

  @Is(phoneRegExp)
  @Column(DataType.STRING)
  phone?: string;

  @IsUrl
  @Column(DataType.STRING)
  avatar?: string;
}
