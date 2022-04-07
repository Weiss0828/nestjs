import { CanActivate, ExecutionContext } from "@nestjs/common";

export class AutoGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    //如果为  空 null false undefine 返回false 否则返回true
    return request.session.id;
  }
}
