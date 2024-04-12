import { User } from './wallet/entities/user.entity';
import { Transaction } from './wallet/entities/transaction.entity';
import { Wallet } from './wallet/entities/wallet.entity';
import { WalletModule } from './wallet/wallet.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'maniple',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'tekana',
      entities: [
        User,
        Wallet,
        Transaction
      ],
      synchronize: true,
      keepConnectionAlive: true
    }),
    WalletModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
