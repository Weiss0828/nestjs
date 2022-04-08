import { CreateReportDto } from "./dtos/create-report.dto";
import { ReportsService } from "./reports.service";
import { User } from "src/users/users.entity";
import { ApprovedReportDto } from "./dtos/approved-report.dto";
import { GetEstimateDto } from "./dtos/get-estimate.dto";
export declare class ReportsController {
    private reportsService;
    constructor(reportsService: ReportsService);
    getEstimate(query: GetEstimateDto): Promise<any>;
    create(body: CreateReportDto, user: User): Promise<import("./reports.entity").Report>;
    apporvedReport(id: string, body: ApprovedReportDto): Promise<import("./reports.entity").Report>;
}
