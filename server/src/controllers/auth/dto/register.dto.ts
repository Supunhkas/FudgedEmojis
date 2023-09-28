import { IsNotEmpty, IsEmail } from 'class-validator';
export class RegisterDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    confirmPassword: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

}
