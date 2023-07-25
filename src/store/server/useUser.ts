import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from '@constants';
import {AuthService} from '@domain';

export function useUser() {
  const {data, isLoading, error} = useQuery(
    [QUERY_KEYS.user],
    AuthService.persistUser,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  return {
    user: data,
    isLoading,
    error,
  };
}

export type UserImpl = () => ReturnType<typeof useUser>;
