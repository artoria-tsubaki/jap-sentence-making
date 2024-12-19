import http from "@/api";
import { Result } from "../interface";

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
  example_id: number
  grammar_id: number
  japanese_sentence: string
  chinese_translation: string
  english_translation: string
  created_at: string
  updated_at: string
}

export interface Sentence {
  sentence_id: number
  user_id: number
  example_id: number
  status: string
  priority: string
  jap_input: string
}

export interface Note {
  note_id?: number
  user_id: number   
  example_id?: number
  grammar_id?: number
  note_content: string   
}

export interface ExampleParams {
  user_id?: number
  grammar_id?: number
  status?: string
  content?: string
}

export interface NoteParams {
  user_id?: number
  grammar_id?: number
  example_id?: number
  note_content?: string
}

/**
 * @name 获取语法
 */
// * 获取语法列表接口
export const getGrammarApi = (params: { level_id: string, limit: number, user_id: number }) => {
	return http.get<(Grammar & Note)[]>(`/grammar`, params);
}

// * 获取例句列表接口
export const getExampleApi = (params: ExampleParams) => {
	return http.get<(Example & Sentence & Note)[]>(`/example/findExample`, params);
}

// * 提交造句接口
export const putSentenceApi = (params: Sentence[]) => {
	return http.put<Sentence>(`/sentence/upset`, params);
}

// * 提交造句接口
export const postNoteApi = (params: NoteParams) => {
	return http.post<Result>(`/note/create`, params);
}