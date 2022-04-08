import { User } from "./../users/users.entity";
import { CreateReportDto } from "./dtos/create-report.dto";
import { Repository } from "typeorm";
import { Report } from "./reports.entity";
import { GetEstimateDto } from "./dtos/get-estimate.dto";
export declare class ReportsService {
    private repo;
    constructor(repo: Repository<Report>);
    createEstimate({ make, model, lng, lat, mileage, year }: GetEstimateDto): Promise<any>;
    create(reportDto: CreateReportDto, user: User): Promise<Report>;
    changeApproval(id: string, approved: boolean): Promise<Report>;
}
