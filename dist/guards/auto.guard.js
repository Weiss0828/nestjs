"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoGuard = void 0;
class AutoGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return request.session.id;
    }
}
exports.AutoGuard = AutoGuard;
//# sourceMappingURL=auto.guard.js.map