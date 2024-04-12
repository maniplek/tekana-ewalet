import { AppHelper } from '../app.helper';
import { Transaction } from './entities/transaction.entity';
import { CustomerService } from './customer.service';
import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { KafkaHelper } from 'src/helpers/kafka-helper';
import { UserUtils } from './customer.helper';
import { User } from './entities/user.entity';
require('dotenv').config();


@Module({
  imports: [
    TypeOrmModule.forFeature([Wallet, Transaction,User]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, AppHelper, KafkaHelper, UserUtils],
  exports: [CustomerService]
})
export class CustomerModule { }
