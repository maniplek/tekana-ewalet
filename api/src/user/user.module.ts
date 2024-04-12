import { AppHelper } from './../app.helper';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { UserUtils } from './user.helper';
import { UserService } from './user.service';
import { PollingHelper } from 'src/helpers/polling.helper';
import { RedisHelper } from 'src/helpers/redis-helper';
import { KafkaHelper } from 'src/helpers/kafka-helper';
import { CommandHandlers } from 'src/auth/commands/handlers';
import { EventHandlers } from 'src/auth/events/handlers';
import { CqrsModule } from '@nestjs/cqrs';
require('dotenv').config();


@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService, UserUtils, AppHelper,PollingHelper,RedisHelper,KafkaHelper,...CommandHandlers,...EventHandlers],
  exports: [UserService]
})
export class UserModule { }
