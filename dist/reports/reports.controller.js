"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const create_report_dto_1 = require("./dtos/create-report.dto");
const auto_guard_1 = require("../guards/auto.guard");
const reports_service_1 = require("./reports.service");
const current_user_decorator_1 = require("../users/decorators/current-user.decorator");
const users_entity_1 = require("../users/users.entity");
const report_dto_1 = require("./dtos/report.dto");
const serialize_interceptors_1 = require("../interceptors/serialize.interceptors");
const approved_report_dto_1 = require("./dtos/approved-report.dto");
const admin_guard_1 = require("../guards/admin.guard");
const get_estimate_dto_1 = require("./dtos/get-estimate.dto");
let ReportsController = class ReportsController {
    constructor(reportsService) {
        this.reportsService = reportsService;
    }
    getEstimate(query) {
        return this.reportsService.createEstimate(query);
    }
    create(body, user) {
        const report = this.reportsService.create(body, user);
        return report;
    }
    apporvedReport(id, body) {
        return this.reportsService.changeApproval(id, body.approved);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_estimate_dto_1.GetEstimateDto]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getEstimate", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auto_guard_1.AutoGuard),
    (0, serialize_interceptors_1.serialize)(report_dto_1.ReportDto),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_report_dto_1.CreateReportDto, users_entity_1.User]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, approved_report_dto_1.ApprovedReportDto]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "apporvedReport", null);
ReportsController = __decorate([
    (0, common_1.Controller)("reports"),
    __metadata("design:paramtypes", [reports_service_1.ReportsService])
], ReportsController);
exports.ReportsController = ReportsController;
//# sourceMappingURL=reports.controller.js.map