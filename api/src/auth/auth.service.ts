import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  async login(user) {
    const { id, email, name, isAdmin } = user;
    const payload = { sub: id, email, name, isAdmin };
    return { access_token: this.jwtService.sign(payload) };
  }
}
