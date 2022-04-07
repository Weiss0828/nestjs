import { Test } from "@nestjs/testing";
import { async } from "rxjs";
import { AuthService } from "./auth.service";
import { User } from "./users.entity";
import { UsersService } from "./users.service";

describe("AuthService", () => {
  let serivce: AuthService;
  let fakeUsersService: Partial<UsersService>;
  const users: User[] = [];
  beforeEach(async () => {
    fakeUsersService = {
      find: (email: string) => {
        const filterUser = users.filter((u) => u.email === email);
        return Promise.resolve(filterUser);
      },
      createUser: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 9999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    serivce = module.get<AuthService>(AuthService);
  });

  it("创建了一个用户服务实例", async () => {
    expect(serivce).toBeDefined();
  });

  it("创建一个新用户并且测试它的密码和哈希散列是否正常", async () => {
    const user = await serivce.signup("18480@690.com", "18486");
    expect(user.password).not.toEqual("18486");
    const [salt, hash] = user.password.split(".");
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it("测试重复邮箱会不会报错", async () => {
    await serivce.signup("a112", "1");
    try {
      await serivce.signup("a112@", "1");
    } catch (error) {
      console.log(error, "测试重复邮箱会不会报错");
    }
  });

  it("测试登录不存在的账号", async () => {
    try {
      await serivce.signin("asdf@qq.com", "asdf");
    } catch (error) {
      console.log(error, "测试登录不存在的账号");
    }
  });

  it("测试输入错误的密码", async () => {
    await serivce.signup("wss@cyx.com", "123");
    try {
      await serivce.signin("wss@cyx.com", "123");
    } catch (error) {
      console.log(error, "测试输入错误的密码");
    }
  });

  it("测试输入正确的密码", async () => {
    await serivce.signup("123@qq.com", "123");
    const user = await serivce.signin("123@qq.com", "123");
    expect(user).toBeDefined();
  });
});
