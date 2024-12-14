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

export interface Example {
  id: number
  grammar_id: number
  japanese_sentence: string
  chinese_translation: string
  english_translation: string
  created_at: string
  updated_at: string
}

export interface Sentence {
  id: number
  user_id: number
  example_id: number
  status: string
  priority: string
  jap_input: string
}

export interface ExampleParams {
  user_id?: number
  grammar_id?: number
  status?: string
  content?: string
}

/**
 * @name 获取语法
 */
// * 获取语法列表接口
export const getGrammarApi = (params: { level_id: string, limit: number }) => {
	return http.get<Grammar[]>(`/grammar`, params);
}

export const getExampleApi = (params: ExampleParams) => {
	return http.get<(Example & Sentence)[]>(`/example/findExample`, params);
}

export const postSentenceApi = (params: Sentence[]) => {
	return http.put<Sentence>(`/sentence/upset`, params);
}