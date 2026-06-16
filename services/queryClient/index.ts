import { MutationCache, QueryClient } from '@tanstack/react-query';
import { t } from 'i18next';
import { ZodError } from 'zod';
import { notify } from '../notify';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
    },
  },
  mutationCache: new MutationCache({
    onError: (error) => {
      if (error instanceof ZodError) {
        notify({
          type: 'error',
          text: t('zod.error'),
        });
      }
    },
  }),
});
