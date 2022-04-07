import { Body, Controller, Post, UseGuards, Patch, Param, Get, Query } from "@nestjs/common";

import { CreateReportDto } from "./dtos/create-report.dto";
import { AutoGuard } from "src/guards/auto.guard";
import { ReportsService } from "./reports.service";
import { CurrentUser } from "src/users/decorators/current-user.decorator";
import { User } from "src/users/users.entity";
import { ReportDto } from "./dtos/report.dto";
import { serialize } from "src/interceptors/serialize.interceptors";
import { ApprovedReportDto } from "./dtos/approved-report.dto"
import { AdminGuard } from "../guards/admin.guard"
import { GetEstimateDto } from "./dtos/get-estimate.dto"

@Controller("reports")
export class ReportsController {
  constructor(private reportsService: ReportsService) { }

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    console.log(query);
  }


  @Post()
  @UseGuards(AutoGuard)
  @serialize(ReportDto)
  create(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    const report = this.reportsService.create(body, user);
    return report;
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  apporvedReport(@Param("id") id: string, @Body() body: ApprovedReportDto) {
    return this.reportsService.changeApproval(id, body.approved)
  }
}
