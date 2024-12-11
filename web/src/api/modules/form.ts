import { ResultData } from "@/api/interface/index";

import http from "@/api";

export interface Grammar {
  id: number
  level_id: number
  grammar_point: string
  explanation: string
  href: string
  meaning: string
  connection: string
  initial: string
  created_at: string
  updated_at: string
}

/**
 * @name 获取语法
 */
// * 获取语法列表接口
export const getGrammarApi = (params: { level_id: string, limit: number }) => {
	return http.get<Grammar[]>(`/grammar`, params);
}