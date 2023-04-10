import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

import { User } from './User';

@Table({ tableName: 'forum_topics', createdAt: 'created_at', updatedAt: 'updated_at' })
export class ForumTopic extends Model<ForumTopic> {
  @PrimaryKey
  @Unique
  @AutoIncrement
  @Column(DataType.NUMBER)
  topic_id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.INTEGER)
  lastMessage_id!: number;

  @BelongsTo(() => User, 'user_id')
  author!: User;
}
