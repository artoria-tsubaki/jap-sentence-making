import * as types from "@/redux/mutation-types";

// * setToken
export const setToken = (token: string) => ({  
	type: types.SET_TOKEN,
	token
});

export const setUserId = (userId: number) => ({  
	type: types.SET_USERID,
	userId
});