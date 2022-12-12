import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  AllotDto,
  CreateUserDto,
  LoginDto,
  TransferDto,
  UpdateUserDto,
  WithdrawDto,
} from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }

  @Put()
  async update(@Body() body: UpdateUserDto) {
    return await this.userService.update(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return await this.userService.login(body);
  }

  @Delete('reset')
  async reset() {
    await this.userService.reset();
    return true;
  }

  @Get()
  async getUser(@Query() query: { id: string }) {
    return await this.userService.getUser(query.id);
  }

  @Get('all')
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Post('transfer')
  async transfer(@Body() body: TransferDto) {
    return await this.userService.transfer(body);
  }

  @Post('allot')
  async allot(@Body() body: AllotDto) {
    return await this.userService.allot(body);
  }

  @Post('withdraw')
  async withdraw(@Body() body: WithdrawDto) {
    return await this.userService.withdraw(body);
  }
}
