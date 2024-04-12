import { CreateWalletDTO } from '../../../wallet/dtos/wallet.dto';

export class WalletCreateEvent {
  constructor(
    public readonly payload: CreateWalletDTO,
  ) { }
}