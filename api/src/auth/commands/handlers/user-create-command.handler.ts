import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UserCreateEvent } from '../../events/implementation';
import { UserCreateCommand } from '../implementation';

@CommandHandler(UserCreateCommand)
export class UserCreateCommandHandler implements ICommandHandler<UserCreateCommand> {
  constructor(
    private readonly eventBus: EventBus,
  ) { }

  async execute(command: UserCreateCommand) {
    const { payload } = command;

    this.eventBus.publish(new UserCreateEvent(payload));
  }
}
