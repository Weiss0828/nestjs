import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";

describe("AuthService System", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("signUp", async () => {
    const res = await request(app.getHttpServer())
      .post("/auth/signup")
      .send({ email: "sdf@qq.com", password: "1234" })
      .expect(201);
    const { id, email } = res.body;
    expect(id).toBeDefined();
    expect(email).toEqual("sdf@qq.com");
  });

  it("登录账号并拿到当前账户的邮箱", async () => {
    const email = "asdf@qq.com";
    const res = await request(app.getHttpServer())
      .post("/auth/signup")
      .send({ email, password: "1234" })
      .expect(201);

    const cookie = res.get("Set-Cookie");

    const { body } = await request(app.getHttpServer())
      .post("/auth/whoAmI")
      .set("Cookie", cookie)
      .expect(201);
    expect(body.email).toEqual(email);
  });
});
