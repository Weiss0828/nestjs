import { User } from "./../users/users.entity";
import { CreateReportDto } from "./dtos/create-report.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Report } from "./reports.entity";
import { GetEstimateDto } from "./dtos/get-estimate.dto";
@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  createEstimate({ make, model, lng, lat, mileage, year }: GetEstimateDto) {
    return (
      this.repo
        .createQueryBuilder()
        .select("AVG(price)", "price")
        //续集注入漏洞
        .where("make = :make", { make })
        .andWhere("model = :model", { model })
        .andWhere("lng - :lng BETWEEN -5 AND 5", { lng })
        .andWhere("lat - :lat BETWEEN -5 AND 5", { lat })
        .andWhere("year - :year BETWEEN -3 AND 3", { year })
        .andWhere("approved Is TRUE")
        .orderBy("ABS(mileage - :mileage)", "DESC")
        .setParameters({ mileage })
        .limit(3)
        .getRawOne()
    );
  }

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne(id);
    if (!report) {
      throw new NotFoundException("不存在此报告");
    }
    report.approved = approved;
    return this.repo.save(report);
  }
}
