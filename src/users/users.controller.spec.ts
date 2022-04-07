import { Test, TestingModule } from "@nestjs/testing";

import { UsersController } from "./users.controller";

import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
describe("UsersController", () => {
  let controller: UsersController;
  let fakeAuthService: Partial<AuthService> = {
    signin: (email: string, password: string) => {
      return Promise.resolve({ id: 1, email, password } as User);
    },
    signup: (email: string, password: string) => {
      return Promise.resolve({ id: 2, email, password } as User);
    },
  };
  let fakeUsersService: Partial<UsersService> = {
    find: (email: string) => {
      return Promise.resolve([{ id: 1, email, password: "456" } as User]);
    },
    findOne: (id: number) => {
      return Promise.resolve({
        id,
        email: "asdf@asdf.com",
        password: "asdf",
      } as User);
    },
    update: (id: number, attr: Partial<User>) => {
      return Promise.resolve({
        id,
        email: "183@qq.com",
        password: attr.password,
      } as User);
    },
    // remove: () => {},
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it("创建一个实例容器", () => {
    expect(controller).toBeDefined();
  });

  it("测试查找所有用户(find)", async () => {
    //需要提供邮箱
    const users = await controller.findAllUser("asdf@asdf.com");
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual("asdf@asdf.com");
  });

  it("查找一个用户(id存在)", async () => {
    const user = await controller.findUser("1");
    expect(user).toBeDefined();
  });

  it("查找一个用户(id不存在)", async () => {
    //打开下面注释可找不到用户
    // fakeUsersService.findOne = () => null;
    try {
      await controller.findUser("1");
    } catch (error) {
      console.log(error, "查找一个用户(id不存在)");
    }
  });

  it("测试登录用户", async () => {
    const session = { id: 3 };
    const user = await controller.signin(
      { email: "123@qq.com", password: "123" },
      session
    );
    expect(user.id).toEqual(1);
    expect(session.id).toEqual(1);
  });

  it("测试创建用户", async () => {
    const session = { id: 3 };
    const user = await controller.createUser(
      {
        email: "123@qq.com",
        password: "123",
      },
      session
    );
    expect(user.id).toEqual(2);
    expect(session.id).toEqual(2);
  });

  it("测试更新用户", async () => {
    const user = await controller.updateUser("12", {
      email: "1834@qq.com",
      password: "123",
    });
    expect(user.email).toEqual("183@qq.com");
    expect(user.password).toEqual("123");
  });
});
