import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

import { UsersService } from "./users.service";

//需要利用里面的数据
//下面是hash函数
const scrypt = promisify(_scrypt);

//表示可注入对象，来给users.module注入
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  //注册
  async signup(email: string, password: string) {
    //1. 查看邮箱是否有重复
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException("email 已被使用!");
    }

    //2.hash 加密密码

    //创建一个随机的值,生成8个字节  tostring("hex")转换成字符数字
    const salt = randomBytes(8).toString("hex");
    //对密码进行hash   32个字节
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    //组合hash和salt
    const result = salt + "." + hash.toString("hex");

    //3.创建一个用户并保存
    const user = await this.usersService.createUser(email, result);

    //4.返回创建成功的信息
    return user;
  }

  //登录
  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException("user not find");
    }
    const [salt, storeHash] = user.password.split(".");

    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storeHash !== hash.toString("hex")) {
      throw new BadRequestException("密码错误");
    }
    return user;
  }
}
