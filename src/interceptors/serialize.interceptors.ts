import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//设置参数传递控制
interface classConstructor  {
  new (...args: any[]): unknown;
}

export function serialize(dto: classConstructor) {
  return UseInterceptors(new SerializeInterceptors(dto));
}
//NestInterceptor表示nest的拦截器
export class SerializeInterceptors implements NestInterceptor {  
  constructor(private dto: classConstructor) {}
  intercept(
    //context是上下文
    context: ExecutionContext,
    //next是拦截器操作
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe (
      map((data: any) => {
        //使用dto来拦截data
        return plainToInstance(this.dto, data, {
          //让dto中的Expose生效
          excludeExtraneousValues: true, 
        });
      }),
    );
  }
}
