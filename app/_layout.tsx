import { NotifyProvider } from '@/components/notify/notify-provider';
import '@/global.css';
import '@/services/i18n';
import { notify } from '@/services/notify';
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { t } from 'i18next';
import { ZodError } from 'zod';

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error) => {
      if (error instanceof ZodError) {
        console.error(error);

        notify({
          type: 'error',
          text: t('errors:zod.error'),
        });
      }
    },
  }),
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
      <NotifyProvider />
    </QueryClientProvider>
  );
}
