import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { myJwtStrategy } from './myJwt.strategy';

const shortJwtToken = JwtModule.register({
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '10s' },
});


@Module({
  imports: [UserModule, PassportModule,shortJwtToken],
  providers: [AuthService, LocalStrategy, JwtStrategy,myJwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
