import LoginReqBody from '../../../models/LoginReqBody';
import { Param, Body, Get, Post, Put, Delete, JsonController, QueryParam, Authorized, BadRequestError, UnauthorizedError } from 'routing-controllers';
import { UserEntity } from './Entity';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

@JsonController("/sample")
export default class {
    @Post()
    async login(@Body() { email, password }: LoginReqBody) {
        const user = await UserEntity.findOneBy({ email })
        if (user == null) throw new UnauthorizedError()
        const isPasswordCorrect = bcrypt.compareSync(password, user.passwordHash)
        if (!isPasswordCorrect) throw new UnauthorizedError()
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env["JWT_SECRET"]!,
            {
                expiresIn: 86400 // 24 hours
            }
        )
        return token
    }
}