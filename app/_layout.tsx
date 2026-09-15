import { NotifyProvider } from '@/components/notify/notify-provider';

import '@/dayjs';
import '@/global.css';
import '@/services/i18n';

import { queryClient } from '@/services/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { DefaultTheme, ThemeProvider } from 'expo-router/react-navigation';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={theme}>
      <QueryClientProvider client={queryClient}>
        <Slot />
        <NotifyProvider />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
