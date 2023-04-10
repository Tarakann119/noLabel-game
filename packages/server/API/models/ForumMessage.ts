import { Column, DataType, Model, NotEmpty, PrimaryKey, Table, Unique } from 'sequelize-typescript';

/** Модель ForumMessage */
@Table({
  tableName: 'forum_messages',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class ForumMessage extends Model<ForumMessage> {
  @PrimaryKey
  @Unique
  @NotEmpty
  @Column(DataType.INTEGER)
  message_id!: number;

  @Column(DataType.INTEGER)
  topic_id!: number;

  @Column(DataType.STRING)
  text!: string;

  @Column(DataType.INTEGER)
  user_id!: number;
}
