import { UserDTO } from "src/user/dtos/user.dto";

export class UserGetAllCommand {
  constructor(
    public readonly payload: UserDTO
  ) { }
}