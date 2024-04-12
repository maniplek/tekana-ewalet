import { UserByEmailDTO } from 'src/user/dtos/user.dto';

export class UserGetByEmailEvent {
  constructor(
    public readonly payload: UserByEmailDTO,
  ) { }
}