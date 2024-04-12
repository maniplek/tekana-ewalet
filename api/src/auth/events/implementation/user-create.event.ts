import {  UserCreateDTO } from "src/user/dtos/user.dto";

export class UserCreateEvent {
  constructor(
    public readonly payload: UserCreateDTO,
  ) { }
}