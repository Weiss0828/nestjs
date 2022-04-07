import { Module, MiddlewareConsumer } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

//设置全局拦截器  APP_INTERCEPTOR, 需要在@nestjs/core包中引入
import { APP_INTERCEPTOR } from "@nestjs/core";

import { AuthService } from "./auth.service";
import { UsersController } from "./users.controller";
import { User } from "./users.entity";
import { UsersService } from "./users.service";
import { CurrentUserInterceptor } from "./interceptors/current-user.interceptor";
import { CurrentUserMiddleWare } from "./middlewares/current-user.middleware";
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
  ],
})
//Guard
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleWare).forRoutes("*")
  }
}
