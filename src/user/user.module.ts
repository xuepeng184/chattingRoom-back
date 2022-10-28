import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';

@Module({
  //定义了注册在当前范围中的user模型
  imports:[SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  //这里导出这个service，为了在authService中使用他
  exports:[UserService]
})
export class UserModule {}




