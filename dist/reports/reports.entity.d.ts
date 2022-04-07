import { User } from "src/users/users.entity";
export declare class Report {
    id: number;
    approved: boolean;
    price: number;
    make: string;
    model: string;
    year: number;
    lng: number;
    lat: number;
    mileage: number;
    user: User;
}
