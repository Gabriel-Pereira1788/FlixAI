import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from '../../helpers/constants/queryKeys';
import auth from '../../repositories/services/auth/auth';

export function useUser() {
  const {data, isLoading, error} = useQuery(
    [QUERY_KEYS.user],
    auth.persistUser,
  );

  return {
    user: data,
    isLoading,
    error,
  };
}

export type UserImpl = () => ReturnType<typeof useUser>;
