import { Controller, Get, Res, UseGuards, Request } from '@nestjs/common';
import { AppHelper } from 'src/app.helper';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserDTO } from './dtos/user.dto';
import { CommandBus } from '@nestjs/cqrs';
import { PollingHelper } from './../helpers/polling.helper';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { UserGetAllCommand } from '../auth/commands/implementation';


@Controller()
export class UserController {
  constructor(
    private readonly appHelper: AppHelper,
    private readonly commandBus: CommandBus,
    private readonly polling: PollingHelper,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('/users')
  async getWallets(@Request() req, @Res() res) {
    const user: UserDTO = req.user;

    const trackid = uuidv4();

    user.trackId=trackid;

    await this.commandBus.execute(
      new UserGetAllCommand(user),
    );

    const { totalUsers, foundUsers } = await this.polling.poll(trackid);

    return this.appHelper.successRequest(res, { totalUsers, foundUsers });
  }


  @MessagePattern(process.env.FIND_ALL_CUSTOMERS_RESPONSE_TOPIC)
  async listenToUserGetAllResponse(@Payload() { value }) {
    console.log("user",value)
    await this.polling.setData(value.trackId, value);
  }
}
