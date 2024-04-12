import {  UserCreateDTO } from "src/user/dtos/user.dto";

export class UserCreateCommand {
  constructor(
    public readonly payload: UserCreateDTO
  ) { }
}