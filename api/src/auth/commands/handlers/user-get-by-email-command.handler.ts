import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UserGetByEmailEvent } from '../../events/implementation';
import { UserGetByEmailCommand } from '../implementation';

@CommandHandler(UserGetByEmailCommand)
export class UserGetByEmailCommandHandler implements ICommandHandler<UserGetByEmailCommand> {
  constructor(
    private readonly eventBus: EventBus,
  ) { }

  async execute(command: UserGetByEmailCommand) {
    const { payload } = command;
    this.eventBus.publish(new UserGetByEmailEvent(payload));
  }
}
