import { AuthService } from "./auth.service";
import { createUserDto } from "./dtos/createUser-dto";
import { updateUserDto } from "./dtos/updateUser-dto";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
export declare class UsersController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    createUser(body: createUserDto, session: any): Promise<User>;
    signin(body: createUserDto, session: any): Promise<User>;
    signOut(session: any): void;
    whoAmI(user: User): User;
    findUser(id: string): Promise<User>;
    findAllUser(email: string): Promise<User[]>;
    removeUser(id: string): Promise<User>;
    updateUser(id: string, body: updateUserDto): Promise<User>;
}
