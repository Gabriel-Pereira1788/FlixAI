import {GPT_KEY} from '@env';
import {logger} from '@utils';
import axios from 'axios';

import {ApiMessage, BodyDTO} from './model';

export class AssistantSuggestionApi {
  async postMessage(
    messages: ApiMessage[],
    tokens?: number,
  ): Promise<string | undefined | null> {
    const BODY: BodyDTO = {
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.3,
      max_tokens: tokens || 150,
    };

    try {
      return await this.trySendMessage(BODY);
    } catch (error) {
      logger.log('error-get', error.message);
      return null;
    }
  }

  private async trySendMessage(body: BodyDTO) {
    logger.log('entrou aqui');
    const {data} = await axios({
      url: 'https://api.openai.com/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GPT_KEY}`,
      },
      data: JSON.stringify(body),
    });
    logger.log('data-gpt', data);
    return data.choices[0].message.content as string;
  }
}
