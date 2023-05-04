import baseApi from ".";
import token from "../store/token";
import user from "../store/user";

export const logout = async () => {
    const response = await baseApi.get('/auth/logout')
    token.set(null)
}


export const refreshToken = async () => {
    const response = await baseApi.get('/auth/refresh')
    const access_token = response.data.accessToken
    token.set(access_token)
    user.set(response.data.user)
    return access_token
}
