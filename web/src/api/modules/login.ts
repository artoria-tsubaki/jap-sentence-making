import { Login, Result } from "@/api/interface/index";

import http from "@/api";

/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
	return http.post<Login.ResLogin>(`/auth/login`, params);
}

/**
 * @name 注册模块
 */
// * 用户登录接口
export const registerApi = (params: Login.ReqLoginForm) => {
	return http.post<Result>(`/users/register`, params);
}
