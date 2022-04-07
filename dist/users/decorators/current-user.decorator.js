"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((data, Context) => {
    const request = Context.switchToHttp().getRequest();
    console.log(request.session, "CurrentUser");
    return request.currentUser;
});
//# sourceMappingURL=current-user.decorator.js.map