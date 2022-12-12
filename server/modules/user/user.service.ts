import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RecordService } from 'modules/record/record.service';
import { Model } from 'mongoose';
import {
  AllotDto,
  CreateUserDto,
  LoginDto,
  TransferDto,
  UpdateUserDto,
  WithdrawDto,
} from './dto';
import { User } from './user.entity';
import * as generator from 'generate-password';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private recordService: RecordService,
  ) {}

  generatePassword() {
    return generator.generate({
      length: 10,
      numbers: true,
    });
  }

  async create(dto: CreateUserDto) {
    const existed = await this.userModel.findOne({
      username: dto.username,
    });

    if (existed) return existed;

    const user = new this.userModel({
      ...dto,
      password: this.generatePassword(),
    });
    return await user.save();
  }

  async update(dto: UpdateUserDto) {
    const user = await this.getUser(dto.id);
    if (!user) {
      throw new HttpException(`沒此用戶`, HttpStatus.BAD_REQUEST);
    }

    await this.userModel.findByIdAndUpdate(dto.id, dto.update);
    return await this.getUser(dto.id);
  }

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({ username: dto.username });
    if (!user) {
      throw new HttpException(`沒此用戶`, HttpStatus.BAD_REQUEST);
    }

    if (user.password !== dto.password) {
      throw new HttpException(`密碼錯誤`, HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async reset() {
    await this.userModel.deleteMany({});
  }

  async getUser(id: string) {
    return await this.userModel.findById(id);
  }

  async getUsers() {
    return await this.userModel.find({});
  }

  async transfer(dto: TransferDto) {
    const fromUser = await this.getUser(dto.from);
    const toUser = await this.getUser(dto.to);

    if (dto.amount > fromUser.balance) {
      throw new HttpException(`餘額不足`, HttpStatus.BAD_REQUEST);
    }

    fromUser.balance -= dto.amount;
    toUser.balance += dto.amount;

    await this.recordService.create({
      type: 'Transfer',
      from: fromUser.id,
      to: toUser.id,
      amount: dto.amount,
    });

    await fromUser.save();
    await toUser.save();

    return true;
  }

  async allot(dto: AllotDto) {
    const toUser = await this.getUser(dto.to);
    toUser.balance += dto.amount;

    await this.recordService.create({
      type: 'Allot',
      to: toUser.id,
      amount: dto.amount,
    });

    await toUser.save();

    return true;
  }

  async withdraw(dto: WithdrawDto) {
    const fromUser = await this.getUser(dto.from);

    if (dto.amount > fromUser.balance) {
      throw new HttpException(`餘額不足`, HttpStatus.BAD_REQUEST);
    }

    fromUser.balance -= dto.amount;

    await this.recordService.create({
      type: 'Withdraw',
      from: fromUser.id,
      amount: dto.amount,
    });

    await fromUser.save();

    return true;
  }
}
