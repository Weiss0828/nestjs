import { Report } from "src/reports/reports.entity";
export declare class User {
    id: number;
    email: string;
    password: string;
    admin: boolean;
    reports: Report[];
    afterInsert(): void;
    afterUpdate(): void;
    afterRemove(): void;
}
