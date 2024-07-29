import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmentDto } from './create-department.dto';
import { IsNotEmpty, IsString, IsEmail, MinLength, MaxLength, IsOptional  } from 'class-validator';

export class UpdateDepartmentDto {
    @IsOptional()
    @IsString() 
    id?: string;

    @IsOptional()
    @IsString()    
    name?: string;
}
