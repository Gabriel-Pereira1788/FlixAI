import {QUERY_KEYS} from '@constants';
import {AuthService} from '@domain';
import {useFetch} from '@infra';

export function useUser() {
  const {data, isLoading, error} = useFetch({
    queryKey: [QUERY_KEYS.user],
    queryFn: AuthService.persistUser,
    options: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  });

  return {
    user: data,
    isLoading,
    error,
  };
}

export type UserImpl = () => ReturnType<typeof useUser>;
