import { UserByEmailDTO } from "src/user/dtos/user.dto";

export class UserGetByEmailCommand {
  constructor(
    public readonly payload: UserByEmailDTO
  ) { }
}