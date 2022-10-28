import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Message extends Model<Message> {
  @Column
  sender: string;

  @Column
  receiver: string;

  @Column
  content: string;
}
