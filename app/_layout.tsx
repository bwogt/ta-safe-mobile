import { NotifyProvider } from '@/components/notify/notify-provider';
import '@/global.css';
import '@/services/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
      <NotifyProvider />
    </QueryClientProvider>
  );
}
