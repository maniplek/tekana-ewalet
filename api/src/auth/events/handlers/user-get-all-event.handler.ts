import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { KafkaHelper } from 'src/helpers/kafka-helper';
import {  UserGetAllEvent } from '../implementation';

@EventsHandler(UserGetAllEvent)
export class UserGetAllEventHandler implements IEventHandler<UserGetAllEvent> {
  constructor(private readonly kafkaHelper: KafkaHelper) { }

  handle(event: UserGetAllEvent) {
    const { payload } = event;
    console.log("payload",payload)

    return this.kafkaHelper.send(payload, process.env.FIND_ALL_CUSTOMERS_REQUEST_TOPIC);
  }
}
