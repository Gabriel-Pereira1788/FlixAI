import {QueryKey, UseQueryOptions, useQuery} from '@tanstack/react-query';

type Options<TData> = {
  queryKey: string[];
  queryFn: () => Promise<TData>;
  options?: Omit<
    UseQueryOptions<TData, unknown, TData, QueryKey>,
    'queryKey' | 'queryFn'
  >;
};

export function useFetch<TData>({queryKey, queryFn, options}: Options<TData>) {
  return useQuery<TData>(queryKey, queryFn, options);
}
