import { IsEmail, MinLength } from "class-validator";

export default class {
    @IsEmail()
    email: string;

    password: string;
}