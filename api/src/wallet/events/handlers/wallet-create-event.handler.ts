import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { KafkaHelper } from 'src/helpers/kafka-helper';
import {  WalletCreateEvent } from '../implementation';

@EventsHandler(WalletCreateEvent)
export class WalletCreateEventHandler implements IEventHandler<WalletCreateEvent> {
  constructor(private readonly kafkaHelper: KafkaHelper) { }

  handle(event: WalletCreateEvent) {
    const { payload } = event;

    return this.kafkaHelper.send(payload, process.env.WALLET_CREATE_REQUEST_TOPIC);
  }
}
