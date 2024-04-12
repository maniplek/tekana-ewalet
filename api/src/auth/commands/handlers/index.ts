import { UserCreateCommandHandler } from './user-create-command.handler';
import { UserGetByEmailCommandHandler } from './user-get-by-email-command.handler';
import { UserGetAllCommandHandler } from './user-get-all-command.handler';


export const CommandHandlers = [
    UserCreateCommandHandler,
    UserGetByEmailCommandHandler,
    UserGetAllCommandHandler
];
