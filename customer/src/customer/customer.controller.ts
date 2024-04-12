import { CustomerService } from './customer.service';
import { KafkaHelper } from 'src/helpers/kafka-helper';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserDTO } from './dtos/user.dto';

@Controller()
export class CustomerController {
  constructor(
    private readonly kafkaHelper: KafkaHelper,
    private readonly customerService: CustomerService,
  ) {}

  @MessagePattern(process.env.CREATE_USER_REQUEST_TOPIC)
  async createUser(@Payload() { value }) {
    const user: UserDTO = value.user;
    console.log("create server...",user)


    let createdUser = await this.customerService.createUser(user);
    const response = { trackId: value.trackId, createdUser: createdUser };

    this.kafkaHelper.send(response, process.env.CREATE_USER_RESPONSE_TOPIC);
  }

  @MessagePattern(process.env.USER_BY_EMAIL_REQUEST_TOPIC)
  async getUserByEmail(@Payload() { value }) {
    const user: UserDTO = value;
    console.log("server2",user)

    let userFound = await this.customerService.findByEmail(user.email);
    console.log("userFound",userFound)

    const response = { trackId: user.trackId, userFound: userFound };
    console.log("response",response)


    this.kafkaHelper.send(response, process.env.USER_BY_EMAIL_RESPONSE_TOPIC);
  }

  @MessagePattern(process.env.USER_BY_NAME_REQUEST_TOPIC)
  async getUserByName(@Payload() { value }) {
    const user: UserDTO = value;

    let userFound = await this.customerService.findByUsername(user.name);

    const response = { trackId: user.trackId, userFound: userFound };
    this.kafkaHelper.send(response, process.env.USER_BY_NAME_RESPONSE_TOPIC);
  }

  @MessagePattern(process.env.FIND_ALL_CUSTOMERS_REQUEST_TOPIC)
  async getAllCustomers(@Payload() { value }) {
    const user: UserDTO = value;

    let foundUsers = [];
    let totalUsers = null;

    if (user.isAdmin) {
      const [users, count] = await this.customerService.findAllUsers();
      foundUsers = users;
      totalUsers = count;
    } else {
      const foundUser = await this.customerService.findByEmail(user.email);
      foundUsers.push(foundUser);
      totalUsers = 1;
    }

    // send response to kafka
    const response = { trackId: user.trackId, totalUsers, foundUsers };
    this.kafkaHelper.send(
      response,
      process.env.FIND_ALL_CUSTOMERS_RESPONSE_TOPIC,
    );
  }
}
