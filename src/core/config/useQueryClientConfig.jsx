import { QueryClient } from '@tanstack/react-query';

import useToast from '~components/toast/useToast';

function useQueryClientConfig() {
  const { error: errorToast } = useToast();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        cacheTime: 5 * 60 * 1000, // cachtime 5 minutes
        staleTime: 1 * 60 * 1000, // update new data 1 minutes
        onError: (err) => {
          console.log(err);
        },
      },
      mutations: {
        onError: (err) => {
          const notToast = ['COM_CER001_003'];
          err?.response?.data?.errors?.forEach((e) => {
            if (!notToast.includes(e.code)) {
              errorToast(e.message);
            }
          });
        },
      },
    },
  });
  return queryClient;
}

export default useQueryClientConfig;
