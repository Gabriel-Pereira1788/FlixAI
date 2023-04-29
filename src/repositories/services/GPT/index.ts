import axios, {AxiosError} from 'axios';
import {GPT_KEY, PROMPT_INITIAL} from '@env';

export class MessageModel {
  createdAt: Date = new Date();
  text?: string;
  sender?: 'assistant' | 'user';
  constructor(props: {text: string; sender: 'assistant' | 'user'}) {
    Object.assign(this, props);
  }
}

type ApiMessage = {
  role: string;
  content: string;
};
export class GPTAssistant {
  systemPrompt: ApiMessage = {
    role: 'system',
    content: PROMPT_INITIAL,
  };

  private normalizeMessages(message: string): ApiMessage {
    return {
      role: 'user',
      content: message,
    };
  }

  async connect() {
    const payloadMessages = [this.systemPrompt];

    return await this.postMessage(payloadMessages, 450);
  }
  async listenResponse(messages: string) {
    const messagesApi = this.normalizeMessages(messages);

    const payloadMessages = [this.systemPrompt, messagesApi];

    return await this.postMessage(payloadMessages);
  }

  async postMessage(
    messages: ApiMessage[],
    tokens?: number,
  ): Promise<string | undefined | null> {
    const body = {
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.3,
      max_tokens: tokens || 150,
    };

    try {
      const {data} = await axios({
        url: 'https://api.openai.com/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GPT_KEY}`,
        },
        data: JSON.stringify(body),
      });
      console.log('data-gpt', data);
      return data.choices[0].message.content as string;
    } catch (error) {
      const Error = error as AxiosError;
      console.log('error-get', Error);
      return null;
    }
  }
}
