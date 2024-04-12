import { UserDTO } from 'src/user/dtos/user.dto';

export class UserGetAllEvent {
  constructor(
    public readonly payload: UserDTO,
  ) { }
}