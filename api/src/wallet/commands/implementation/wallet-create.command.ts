import { CreateWalletDTO } from '../../dtos/wallet.dto';

export class WalletCreateCommand {
  constructor(
    public readonly payload: CreateWalletDTO
  ) { }
}