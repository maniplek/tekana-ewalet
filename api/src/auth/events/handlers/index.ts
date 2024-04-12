import { UserCreateEventHandler } from './user-create-event.handler';
import { UserGetByEmailEventHandler } from './user-get-by-email-event.handler';
import { UserGetAllEventHandler } from './user-get-all-event.handler';


export const EventHandlers = [
    UserCreateEventHandler,
    UserGetByEmailEventHandler,
    UserGetAllEventHandler
];
