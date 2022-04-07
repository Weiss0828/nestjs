"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializeInterceptors = exports.serialize = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const operators_1 = require("rxjs/operators");
function serialize(dto) {
    return (0, common_1.UseInterceptors)(new SerializeInterceptors(dto));
}
exports.serialize = serialize;
class SerializeInterceptors {
    constructor(dto) {
        this.dto = dto;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => {
            return (0, class_transformer_1.plainToInstance)(this.dto, data, {
                excludeExtraneousValues: true,
            });
        }));
    }
}
exports.SerializeInterceptors = SerializeInterceptors;
//# sourceMappingURL=serialize.interceptors.js.map