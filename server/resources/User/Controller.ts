import LoginReqBody from '../../../models/LoginReqBody';
import { Param, Body, Get, Post, Put, Delete, JsonController, QueryParam, Authorized, BadRequestError, UnauthorizedError, HttpError, InternalServerError, HeaderParam } from 'routing-controllers';
import { UserEntity } from './Entity';
import Bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"
import RegisterReqBody from '../../../models/RegisterReqBody';

@JsonController("/user")
export default class {

    private readonly tokenRegex: RegExp = /^Bearer ((?:\.?(?:[A-Za-z0-9-_]+)){3})$/gm

    @Post('/login')
    async login(@Body() { email, password }: LoginReqBody) {
        const user = await UserEntity.findOneBy({ email })
        if (user == null) throw new UnauthorizedError()
        const isPasswordCorrect = Bcrypt.compareSync(password, user.passwordHash)
        if (!isPasswordCorrect) throw new UnauthorizedError()
        const token = Jwt.sign(
            { id: user.id, role: user.role },
            process.env['JWT_SECRET']!,
            {
                expiresIn: 86400 // 24 hours
            }
        )
        return token
    }

    @Post('/register')
    async register(@Body() { email, password, name }: RegisterReqBody) {
        const passwordHash = Bcrypt.hashSync(password, 8)
        try {
            await UserEntity.create({ email, passwordHash, name }).save()
        } catch (error: any) {
            if (error.code == 23505) throw new HttpError(409, "User already exists")
            else throw new InternalServerError("Internal Server Error")
        }
        return "Registration Succesful"
    }

    @Get('/me')
    async me(@HeaderParam("authorization") bearerToken: string) {
        const token = this.tokenRegex.exec(bearerToken)?.[1]
        if (token == null) throw new BadRequestError()
        const payload = Jwt.verify(token, process.env['JWT_SECRET']!)
    }
}