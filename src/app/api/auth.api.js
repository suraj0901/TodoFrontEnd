import baseApi from ".";
import token from "../store/token";
import user from "../store/user";

export const logout = async () => {
    const response = await baseApi.get('/auth/logout')
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    token.set(null)
    user.set(null)
}


export const refreshToken = async () => {
    const response = await baseApi.get('/auth/refresh')
    const access_token = response.data.accessToken
    token.set(access_token)
    localStorage.setItem("token", access_token)
    user.set(response.data.user)
    localStorage.setItem("user", response.data.user)
    return access_token
}
