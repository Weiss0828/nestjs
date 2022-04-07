import { createParamDecorator, ExecutionContext } from "@nestjs/common";

//创造的自定义装饰器是无法访问数据库的数据的
export const CurrentUser = createParamDecorator(
  (data: never, Context: ExecutionContext) => {
    const request = Context.switchToHttp().getRequest();
    console.log(request.session, "CurrentUser");
    return request.currentUser;
  }
);
