import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from "@nestjs/common";

import { serialize } from "../interceptors/serialize.interceptors";
import { userShowDto } from "../users/dtos/userShow-dto";
import { AuthService } from "./auth.service";
import { createUserDto } from "./dtos/createUser-dto";
import { updateUserDto } from "./dtos/updateUser-dto";
import { UsersService } from "./users.service";

import { AutoGuard } from "../guards/auto.guard";

import { User } from "./users.entity";

import { CurrentUser } from "./decorators/current-user.decorator";

//创建所要传递的规则(字段)
//更新密码所要传递的规则(字段)
//操作实际完成都要通知UsersService完成
//下面一个是自定义拦截器
//对创建用户密码进行拦截加密,然后保存起来
@Controller("auth")
//设置拦截器不让密码发送出去  @serialize(userShowDto)
@serialize(userShowDto)
export class UsersController {
  //初始化usersService
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}
  //测试session
  //#region
  // @Get("/color/:color")
  // setColor(@Param("color") color: string, @Session() session: any) {
  //   session.color = color;
  // }
  // @Get("/color")
  // getColor(@Session() session: any) {
  //   return session.color;
  // }
  //#endregion

  // auth/signup  创建用户
  @Post("/signup")
  async createUser(@Body() body: createUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    //设置session为用户的id,session有自动加密功能
    session.id = user.id;
    return user;
  }

  // auth/signin  登录用户
  @Post("/signin")
  async signin(@Body() body: createUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    //设置session为用户的id,session有自动加密功能
    session.id = user.id;
    return user;
  }

  //注销用户
  @Post("/signout")
  signOut(@Session() session: any) {
    //注销是通过改变session来改变的
    session.id = null;
  }

  //自定义修饰器
  @Post("/whoAmI")
  //设置路由守卫
  @UseGuards(AutoGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  //传入id来进行查找用户
  @Get("/:id")
  async findUser(@Param("id") id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException("没找到");
    }
    //id传过来是字符串，需要parseInt转换成数值
    return user;
  }

  // 通过邮箱来查找用户，返回的是数组
  @Get()
  findAllUser(@Query("email") email: string) {
    return this.usersService.find(email);
  }

  // 通过id来删除用户
  @Delete("/:id")
  removeUser(@Param("id") id: string) {
    return this.usersService.remove(parseInt(id));
  }

  // 来更新用户需要param传入id,通过body来传入参数，参数列表看updateUserDto
  @Patch("/:id")
  updateUser(@Param("id") id: string, @Body() body: updateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
