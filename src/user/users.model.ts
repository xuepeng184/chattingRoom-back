//在此定义模型字段

import { Column,Model,Table } from 'sequelize-typescript';


@Table
export class User extends Model<User>{
  @Column
  username:string;
  @Column
  password:string;
  @Column
  userPic:string;
}