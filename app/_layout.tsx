import { NotifyProvider } from '@/components/notify/notify-provider';
import { Stack } from 'expo-router';
import '../global.css';
import '../services/i18n';

export default function RootLayout() {
  return (
    <>
      <Stack />
      <NotifyProvider />
    </>
  );
}
