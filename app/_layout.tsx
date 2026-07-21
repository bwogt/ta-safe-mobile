import { NotifyProvider } from '@/components/notify/notify-provider';
import '@/dayjs';
import '@/global.css';
import '@/services/i18n';
import { queryClient } from '@/services/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
      <NotifyProvider />
    </QueryClientProvider>
  );
}
