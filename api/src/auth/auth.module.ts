import { WalletModule } from './../wallet/wallet.module';
import { AppHelper } from './../app.helper';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CqrsModule } from '@nestjs/cqrs';
import { PollingHelper } from './../helpers/polling.helper';
import { RedisHelper } from './../helpers/redis-helper';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { KafkaHelper } from 'src/helpers/kafka-helper';




@Module({
  imports: [
    CqrsModule,
    UserModule,
    WalletModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AppHelper,PollingHelper,RedisHelper,KafkaHelper,...CommandHandlers,...EventHandlers],
  exports: [AuthService],
})
export class AuthModule { }
