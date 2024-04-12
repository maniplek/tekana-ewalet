import { GetWalletsCommandHandler } from './wallet-get-wallets-command.handler';
import { WalletTransactionsCommandHandler } from './wallet-transactions-command.handler';
import { WalletTopUpCommandHandler } from './wallet-topup-command.handler';
import { WalletBalanceCommandHandler } from "./wallet-balance-command.handler";
import { WalletCreateCommandHandler } from "./wallet-create-command.handler";


export const CommandHandlers = [
    WalletBalanceCommandHandler,
    WalletTopUpCommandHandler,
    WalletTransactionsCommandHandler,
    GetWalletsCommandHandler,
    WalletCreateCommandHandler
];
