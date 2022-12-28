import {Injectable} from '@nestjs/common';
import {CreateUserDto} from '../dto/create-user.dto';
import {UpdateUserDto} from '../dto/update-user.dto';
import {UsersRepository} from "../repository/users.repository";

@Injectable()
export class UsersService {

  constructor(
      private readonly usersRepository: UsersRepository,
  ) {
  }

  async create(createUserDto: CreateUserDto) {
    let hash = await this.hashPassword(createUserDto.password);
    createUserDto.password = hash;
    return this.usersRepository.create(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async hashPassword(password) {
    const bcrypt = require('bcrypt');
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

    async findByEmail(email: string) {
        return this.usersRepository.findOne({email: email});
    }
}
