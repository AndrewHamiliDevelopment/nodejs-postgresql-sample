import { IsNotEmpty, IsString } from "class-validator";

export class ProjectsAddDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    description: string;
}