import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { WalletCreateEvent } from '../../events/implementation';
import { WalletCreateCommand } from '../implementation';

@CommandHandler(WalletCreateCommand)
export class WalletCreateCommandHandler implements ICommandHandler<WalletCreateCommand> {
  constructor(
    private readonly eventBus: EventBus,
  ) { }

  async execute(command: WalletCreateCommand) {
    const { payload } = command;

    this.eventBus.publish(new WalletCreateEvent(payload));
  }
}
