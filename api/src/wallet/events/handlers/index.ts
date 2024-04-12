import { GetWalletsEventHandler } from './wallet-get-wallets-event.handler';
import { WalletTransactionsEventHandler } from './wallet-transactions-event.handler';
import { WalletTopUpEventHandler } from './wallet-topup-event.handler';
import { WalletBalanceEventHandler } from "./wallet-balance-event.handler";
import { WalletCreateEventHandler } from "./wallet-create-event.handler";


export const EventHandlers = [
    WalletBalanceEventHandler,
    WalletTopUpEventHandler,
    WalletTransactionsEventHandler,
    GetWalletsEventHandler,
    WalletCreateEventHandler
];
