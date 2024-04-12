import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { KafkaHelper } from 'src/helpers/kafka-helper';
import { UserCreateEvent } from '../implementation';

@EventsHandler(UserCreateEvent)
export class UserCreateEventHandler implements IEventHandler<UserCreateEvent> {
  constructor(private readonly kafkaHelper: KafkaHelper) { }

  async handle(event: UserCreateEvent) {
    const { payload } = event;
    let res=await this.kafkaHelper.send(payload, process.env.CREATE_USER_REQUEST_TOPIC)
    console.log("payload",res)
    return res;
  }
}
