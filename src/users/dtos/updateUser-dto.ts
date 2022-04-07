import { IsString, IsEmail, IsOptional } from 'class-validator';
//IsOptional  表示可选参数项
export class updateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
