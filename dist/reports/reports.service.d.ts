import { User } from "./../users/users.entity";
import { CreateReportDto } from "./dtos/create-report.dto";
import { Repository } from "typeorm";
import { Report } from "./reports.entity";
export declare class ReportsService {
    private repo;
    constructor(repo: Repository<Report>);
    create(reportDto: CreateReportDto, user: User): Promise<Report>;
    changeApproval(id: string, approved: boolean): Promise<Report>;
}
