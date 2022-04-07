import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "./users.entity";

@Injectable()
export class UsersService {
  //repo: Repository<user>是系统定义好的几个功能，这个是固定格式
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  //创建添加一个用户
  createUser(email: string, password: string) {
    const result = this.repo.create({ email, password });
    return this.repo.save(result);
  }
  //查找一个用户，没查到返回null
  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException("没找到用户");
    }
    const user = await this.repo.findOne(id);
    return user;
  }
  //查找一个邮箱，没查到返回空数组
  async find(email: string) {
    const user = await this.repo.find({ email });
    return user;
  }
  //更新数据表中数据
  async update(id: number, attr: Partial<User>) {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new NotFoundException("user not found!");
    }
    Object.assign(user, attr);
    return this.repo.save(user);
  }
  //根据id删数据
  async remove(id: number) {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new NotFoundException("user not found!");
    }
    return this.repo.remove(user);
  }
}
