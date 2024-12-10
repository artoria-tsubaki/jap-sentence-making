import { toastError } from '@/utils/toast'

export const checkStatus = (status: number): void => {
	switch (status) {
		case 400:
			toastError("请求失败！请您稍后重试");
			break;
		case 401:
			toastError("登录失效！请您重新登录");
			break;
		case 403:
			toastError("当前账号无权限访问！");
			break;
		case 404:
			toastError("你所访问的资源不存在！");
			break;
		case 405:
			toastError("请求方式错误！请您稍后重试");
			break;
		case 408:
			toastError("请求超时！请您稍后重试");
			break;
		case 500:
			toastError("服务异常！");
			break;
		case 502:
			toastError("网关错误！");
			break;
		case 503:
			toastError("服务不可用！");
			break;
		case 504:
			toastError("网关超时！");
			break;
		default:
			toastError("请求失败！");
	}
};
