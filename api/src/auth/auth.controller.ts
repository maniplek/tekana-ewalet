import { LoginValidation } from './validations/login.validation';
import { AppHelper } from './../app.helper';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { RegisterUserValidation } from '../auth/validations/register.validation';
import { AuthService } from './auth.service';
import { WalletDTO } from 'src/wallet/dtos/wallet.dto';
import { CreateWalletDTO } from 'src/wallet/dtos/wallet.dto';
import { WalletCreateCommand } from 'src/wallet/commands/implementation';
import { CommandBus } from '@nestjs/cqrs';
import { PollingHelper } from './../helpers/polling.helper';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserCreateCommand } from './commands/implementation';
import { UserGetByEmailCommand } from './commands/implementation';
import { UserCreateDTO } from 'src/user/dtos/user.dto';

import { UserByEmailDTO } from 'src/user/dtos/user.dto';

import { v4 as uuidv4 } from 'uuid';

@Controller()
export class AuthController {
  constructor(
    private readonly appHelper: AppHelper,
    private readonly authService: AuthService,
    private readonly commandBus: CommandBus,
    private readonly polling: PollingHelper,
  ) { }

  @Post('/auth/login')
  async login(@Body(LoginValidation) request, @Res() res) {
    const { error } = request;
    if (error) return this.appHelper.badRequest(res, error.details[0].message);

    const { email, password } = request.value;
    const emailtrackid = uuidv4();

    const userByEmailtRequest: UserByEmailDTO = {
      email: email,
      trackId: emailtrackid,
    };
    await this.commandBus.execute(
      new UserGetByEmailCommand(userByEmailtRequest),
    );

    const { userFound } = await this.polling.poll(emailtrackid);

    if (!userFound)
      return this.appHelper.badRequest(res, 'Invalid email or password');

    const isValid = await this.authService.comparePassword(
      password,
      userFound.password,
    );
    if (!isValid)
      return this.appHelper.badRequest(res, 'Invalid email or password');

    const { access_token } = await this.authService.login(userFound);
    return this.appHelper.successRequest(res, { access_token });
  }

  @Post('/auth/register')
  async register(@Body(RegisterUserValidation) request, @Res() res) {
    const { error } = request;
    if (error) return this.appHelper.badRequest(res, error.details[0].message);

    const userPayload = request.value;

    const emailtrackid = uuidv4();

    const userByEmailtRequest: UserByEmailDTO = {
      email: userPayload.email,
      trackId: emailtrackid,
    };
    await this.commandBus.execute(
      new UserGetByEmailCommand(userByEmailtRequest),
    );

    const { userFound } = await this.polling.poll(emailtrackid);
    if (userFound)
      return this.appHelper.badRequest(
        res,
        'Email is already taken, try another one',
      );

    userPayload.isAdmin = false;

    const createtrackid = uuidv4();

    const userCreateRequest: UserCreateDTO = {
      user: userPayload,
      trackId: createtrackid,
    };
    console.log("user.....", userCreateRequest)
    await this.commandBus.execute(new UserCreateCommand(userCreateRequest));

    const { createdUser } = await this.polling.poll(createtrackid);
    const { password, ...user } = createdUser;
    const wallet: WalletDTO = { user: createdUser, balance: '0' };

    const walletTrackid = uuidv4();
    const creaateWalletRequest: CreateWalletDTO = {
      wallet,
      trackId: walletTrackid,
    };
    await this.commandBus.execute(
      new WalletCreateCommand(creaateWalletRequest),
    );

    await this.polling.poll(walletTrackid);
    const { access_token } = await this.authService.login(user);
    return this.appHelper.successRequest(res, { user, access_token }, 201);
  }

  @MessagePattern(process.env.WALLET_CREATE_RESPONSE_TOPIC)
  async listenToCreateWalletResponse(@Payload() { value }) {
    await this.polling.setData(value.trackId, value);
  }

  @MessagePattern(process.env.CREATE_USER_RESPONSE_TOPIC)
  async listenToCreateUserResponse(@Payload() { value }) {
    await this.polling.setData(value.trackId, value);
  }

  @MessagePattern(process.env.USER_BY_EMAIL_RESPONSE_TOPIC)
  async listenToUserByEmailResponse(@Payload() { value }) {
    console.log("user", value)
    await this.polling.setData(value.trackId, value);
  }
}
