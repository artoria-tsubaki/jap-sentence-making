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
  example_id: number
  grammar_id: number
  japanese_sentence: string
  chinese_translation: string
  english_translation: string
  created_at: string
  updated_at: string
}

export interface Sentence {
  sentence_id?: number
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
  note_content?: string   
}
export interface Proficiency {
  user_id: number
  grammar_id: number
  proficiency_id: number
  proficiency: string
}

export interface ProficiencyParams {
  id?: number
  user_id: number
  grammar_id: number
  proficiency: string
}

export interface ExampleParams {
  user_id?: number
  grammar_id?: number
  status?: string
  content?: string
}

export interface NoteParams {
  id?: number
  user_id?: number
  grammar_id?: number
  example_id?: number
  note_content?: string
}

/**
 * @name 获取语法
 */
// * 获取语法列表接口
export const getGrammarApi = (params: { level_id: string, limit: number, user_id: number, proficiency: string }) => {
	return http.get<(Grammar & Note & Proficiency)[]>(`/grammar`, params);
}

// * 获取例句列表接口
export const getExampleApi = (params: ExampleParams) => {
	return http.get<(Example & Sentence & Note & Grammar)[]>(`/example/findExample`, params);
}

// * 提交造句接口
export const putSentenceApi = (params: Sentence[]) => {
	return http.put<Sentence>(`/sentence/upset`, params);
}

// * 提交语法熟练度接口
export const putProficiencyApi = (params: ProficiencyParams) => {
	return http.post<Proficiency>(`/proficiency/upset`, params);
}

// * 创建接口
export const postNoteApi = (params: NoteParams) => {
	return http.post<number>(`/note/create`, params);
}

// * 修改笔记接口
export const putNoteApi = (params: NoteParams) => {
	return http.put<number>(`/note/update`, params);
}

// * 删除造句接口
export const deleteNoteApi = (node_id: number) => {
	return http.delete<number>(`/note/${node_id}`);
}