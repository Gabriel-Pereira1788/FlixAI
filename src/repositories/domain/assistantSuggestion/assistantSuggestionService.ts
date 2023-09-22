import {PROMPT_INITIAL} from '@env';

import {AssistantSuggestionAdapters} from './assistantSuggestionAdapters';
import {AssistantSuggestionApi} from './assistantSuggestionApi';
import {
  ApiMessage,
  SuggestionServiceImpl,
  SuggestionsAdaptersImpl,
} from './model';

export class AssistantSuggestionService implements SuggestionServiceImpl {
  private assistantApi = new AssistantSuggestionApi();
  adapters: SuggestionsAdaptersImpl = new AssistantSuggestionAdapters();

  async getResponseAssistant(
    text: string,
  ): Promise<{text?: string; listSuggestions: string[]} | null> {
    const responseAssistant = await this.listenResponse(text);

    if (responseAssistant) {
      const data = this.adapters.toStringMoviesList(responseAssistant!);

      return {
        text: data.text,
        listSuggestions: data.result,
      };
    }
    return null;
  }

  private async listenResponse(messages: string) {
    const systemPrompt: ApiMessage = {
      role: 'system',
      content: PROMPT_INITIAL,
    };
    const messagesApi = this.adapters.toApiMessages(messages);

    const payloadMessages = [systemPrompt, messagesApi];

    return await this.assistantApi.postMessage(payloadMessages);
  }
}
