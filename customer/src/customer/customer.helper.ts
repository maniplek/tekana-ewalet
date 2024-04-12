import { Injectable } from '@nestjs/common';
const bcrypt = require('bcrypt');

@Injectable()
export class UserUtils {

  constructor() { }

  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }


}
