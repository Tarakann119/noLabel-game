import {
  Column,
  ForeignKey,
  Model,
  NotEmpty,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

import { ForumMessage } from './ForumMessage';
import { User } from './User';

/** Модель Emoji */
@Table({
  underscored: true,
  updatedAt: false,
})
export class Emoji extends Model<Emoji> {
  @PrimaryKey
  @Unique
  @NotEmpty
  @Column
  emoji_id!: number;

  @ForeignKey(() => User)
  @Column
  user_id!: number;

  @ForeignKey(() => ForumMessage)
  @Column
  message_id!: number;
}
