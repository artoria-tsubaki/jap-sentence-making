// * 请求响应参数(不包含data)
export interface Result {
	code: number;
	msg: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data?: T;
}

// * 分页响应参数
export interface ResPage<T> {
	datalist: T[];
	pageNum: number;
	pageSize: number;
	total: number;
}

// * 分页请求参数
export interface ReqPage {
	pageNum: number;
	pageSize: number;
}

export interface SqlParams {
  field: string;
  value: any;
  sql: string;
}

// * 登录
export namespace Login {
	export interface ReqLoginForm {
		username: string;
		password: string;
	}
	export interface ResLogin {
		accessToken: string;
		user_id: number;
	}
}

export interface Sentence{
  sentence_id: number;
  user_id: number;
  example_id: number;
  status: string;
  priority: string;
  jap_input: string;
  created_at: Date;
  updated_at: Date;
}