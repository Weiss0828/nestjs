import { Repository } from "typeorm";
import { User } from "./users.entity";
export declare class UsersService {
    private repo;
    constructor(repo: Repository<User>);
    createUser(email: string, password: string): Promise<User>;
    findOne(id: number): Promise<User>;
    find(email: string): Promise<User[]>;
    update(id: number, attr: Partial<User>): Promise<User>;
    remove(id: number): Promise<User>;
}
