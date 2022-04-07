import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
interface classConstructor {
    new (...args: any[]): unknown;
}
export declare function serialize(dto: classConstructor): MethodDecorator & ClassDecorator;
export declare class SerializeInterceptors implements NestInterceptor {
    private dto;
    constructor(dto: classConstructor);
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>>;
}
export {};
