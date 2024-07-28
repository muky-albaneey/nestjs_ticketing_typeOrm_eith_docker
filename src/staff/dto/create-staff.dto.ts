import { IsNotEmpty, IsString, IsEmail, MinLength, MaxLength, IsOptional  } from 'class-validator';

export class CreateStaffDto {
    @IsOptional()
    @IsString()    
    full_name: string;

    @IsNotEmpty({message : "The email field is empty "})
    @IsEmail()
    @IsString()    
    email : string;
   
    @IsNotEmpty({message : "The password field is empty"})
    @MinLength(6, {message : "The password should exceed 5"})
    @MaxLength(14, {message : "The password should not exceed 14"})     
    @IsString()  
    password : string

    @IsOptional()
    @IsString() 
    rememberToken?: string
}

export class LoginDto {
    @IsNotEmpty({message : "The email field is empty "})
    @IsEmail()
    @IsString()    
    email : string;
   
    @IsNotEmpty({message : "The password field is empty"})
    @MinLength(6, {message : "The password should exceed 5"})
    @MaxLength(14, {message : "The password should not exceed 14"})     
    @IsString()  
    password : string
}