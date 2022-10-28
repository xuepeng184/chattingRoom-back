import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//导入数据库
import { SequelizeModule } from '@nestjs/sequelize';


import { UserModule } from './user/user.module';
import { User } from './user/users.model';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { Message } from './message/messages.model'
import { WebSocketModule } from './web-socket/web-socket.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql', // 数据库类型，sequelize支持  Postgres, MySQL, MariaDB, SQLite 以及 Microsoft SQL Server. 且对数据库版本有要求。可移步官网查看
      host: '127.0.0.1', // 主机ip
      port: 3306, // 数据库端口 mysql默认在3306端口
      username: 'root', // 数据库用户名
      password: '20140326..', // 数据库密码
      database: 'chatroom', // 具体数据库
      models: [User,Message], // 要开始使用`User`模型，我们需要通过将其插入到`forRoot()`方法选项的`models`数组中来让`Sequelize`知道它的存在。
      autoLoadModels:true, //自动载入模型
    }),
    SequelizeModule.forFeature([User,Message]),
    UserModule,
    AuthModule,
    MessageModule,
    WebSocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
