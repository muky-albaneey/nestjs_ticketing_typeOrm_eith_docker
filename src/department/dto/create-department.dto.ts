import { IsNotEmpty, IsString, IsEmail, MinLength, MaxLength, IsOptional  } from 'class-validator';


export class CreateDepartmentDto {
    // @IsOptional()
    // @IsString() 
    // id?: string;

    @IsOptional()
    @IsString()    
    name?: string;
}

