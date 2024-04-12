import { User } from './customer/entities/user.entity';
import { CustomerModule } from './customer/customer.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './customer/entities/wallet.entity';
import { Transaction } from './customer/entities/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'maniple',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'tekana',
      entities: [  User, Wallet,Transaction ],
      synchronize: true,
      keepConnectionAlive: true
    }),
    CustomerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
