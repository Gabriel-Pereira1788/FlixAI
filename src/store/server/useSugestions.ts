import {useQuery} from '@tanstack/react-query';
import {KeywordsGptImpl} from '../../repositories/database/useCases/KeywordsGpt/model';
import {_useKeywordsGpt} from '../../repositories/database/useCases/KeywordsGpt/useKeywordsGpt';
import {AssistantSugestion} from '../../repositories/services/api/modules/assistantSugestion/assistantSugestion';

type Props = {
  messageData: {
    text: string;
    id: string | number;
  };
  useKeywordsGpt?: KeywordsGptImpl;
};

const Assistant = new AssistantSugestion();

export function _useSugestions({
  messageData,
  useKeywordsGpt = _useKeywordsGpt,
}: Props) {
  const keywordsGpt = useKeywordsGpt();
  const {data, isLoading} = useQuery(
    ['sugestions', messageData.text.trim()],
    () => Assistant.getSugestions(messageData, keywordsGpt),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  return {
    data,
    isLoading,
  };
}

export type SugestionsImpl = (
  props: Props,
) => ReturnType<typeof _useSugestions>;
