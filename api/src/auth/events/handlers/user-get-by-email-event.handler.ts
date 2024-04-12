import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { KafkaHelper } from 'src/helpers/kafka-helper';
import {  UserGetByEmailEvent } from '../implementation';

@EventsHandler(UserGetByEmailEvent)
export class UserGetByEmailEventHandler implements IEventHandler<UserGetByEmailEvent> {
  constructor(private readonly kafkaHelper: KafkaHelper) { }

  handle(event: UserGetByEmailEvent) {
    const { payload } = event;
    console.log("payload",payload)

    return this.kafkaHelper.send(payload, process.env.USER_BY_EMAIL_REQUEST_TOPIC);
  }
}
