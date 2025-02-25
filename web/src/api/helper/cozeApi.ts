import { CozeAPI } from '@coze/api';
import config from '@/config/cozeConfig.json'
export default async function getCozeApi(jap_translation: string, ch_sentence: string, grammar: string) {
  const apiClient = new CozeAPI({
    token: config.token,
    baseURL: 'https://api.coze.cn',
    allowPersonalAccessTokenInBrowser: true
  });
  const res = await apiClient.workflows.runs.create({
    workflow_id: config.workflow_id,
    parameters: {jap_translation, ch_sentence, grammar},
  })
  return res;
}
