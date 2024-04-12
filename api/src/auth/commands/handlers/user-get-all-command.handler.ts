import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UserGetAllEvent } from '../../events/implementation';
import { UserGetAllCommand } from '../implementation';

@CommandHandler(UserGetAllCommand)
export class UserGetAllCommandHandler implements ICommandHandler<UserGetAllCommand> {
  constructor(
    private readonly eventBus: EventBus,
  ) { }

  async execute(command: UserGetAllCommand) {
    const { payload } = command;
    this.eventBus.publish(new UserGetAllEvent(payload));
  }
}
