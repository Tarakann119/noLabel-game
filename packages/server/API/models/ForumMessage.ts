import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

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
})
export class ForumMessage extends Model<ForumMessage> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  override id!: number;

  @Column(DataType.INTEGER)
  topic_id!: number;

  @Column(DataType.STRING)
  text!: string;

  @Column(DataType.INTEGER)
  user_id!: number;
}
