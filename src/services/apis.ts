import axios, { AxiosResponse } from "axios"
import Cookies from "universal-cookie";
import cookieKeys from "@/constants/cookie-keys";
const lang = "en"
const routeParamRegex = /^:(\w+)$/;
// Model Imports
import { 
LoginReqBody,
RegisterOrganizationReqBody,
ResetPasswordReqBody,
User,
UserCreateBody,
} from "models"

function createAxiosInstance() {
    const token = new Cookies().get(cookieKeys.COOKIE_USER_TOKEN, { doNotParse: true} )
    return axios.create({ baseURL: (process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000') + "/api", headers: { "Authorization": `Bearer ${token}`, "Accept-Language": lang } })
}

function createUrl(params: { [key: string]: string }, route: string) {
    let url = ""
    for (const block of route.substring(1).split("/")) {
        url += "/"
        const paramRegExpArray = block.match(routeParamRegex)
        if (paramRegExpArray == null) { url += block; continue }
        else url += params[`${Object.keys(params).find(p => p === paramRegExpArray[1])}`]
    }
    return url
}

export default {
    user: {
        async login(
            body: LoginReqBody,
        ) : Promise<AxiosResponse<string>>
        {
            const route = "/user/login"
            const url = route
            return await createAxiosInstance().request({
                method: "post",
                url,
                data: body,
            })
        },
        async registerOrganization(
            body: RegisterOrganizationReqBody,
        ) : Promise<AxiosResponse<any>>
        {
            const route = "/user/register-organization"
            const url = route
            return await createAxiosInstance().request({
                method: "post",
                url,
                data: body,
            })
        },
        async inviteMember(
            body: UserCreateBody,
        ) : Promise<AxiosResponse<string>>
        {
            const route = "/user/invite-member"
            const url = route
            return await createAxiosInstance().request({
                method: "post",
                url,
                data: body,
            })
        },
        async resetPassword(
            body: ResetPasswordReqBody,
        ) : Promise<AxiosResponse<any>>
        {
            const route = "/user/reset-password"
            const url = route
            return await createAxiosInstance().request({
                method: "post",
                url,
                data: body,
            })
        },
        async forgotPassword(
            queries: { email: string, },
        ) : Promise<AxiosResponse<any>>
        {
            const route = "/user/forgot-password"
            const url = route
            return await createAxiosInstance().request({
                method: "post",
                url,
                params: queries,
            })
        },
        async me(
        ) : Promise<AxiosResponse<User>>
        {
            const route = "/user/me"
            const url = route
            return await createAxiosInstance().request({
                method: "get",
                url,
            })
        },
    },
    
} 