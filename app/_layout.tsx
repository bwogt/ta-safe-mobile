import { NotifyProvider } from '@/components/notify/notify-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import '../global.css';
import '../services/i18n';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack />
      <NotifyProvider />
    </QueryClientProvider>
  );
}
