import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "../../entity/User";

export class UserAddDto {
    @IsString()
    @IsNotEmpty()
    username: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;
    
    @IsEnum(Role)
    @IsNotEmpty()
    role: Role;
}