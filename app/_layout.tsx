import { NotifyProvider } from '@/components/notify/notify-provider';
import { Stack } from 'expo-router';
import '../global.css';

export default function RootLayout() {
  return (
    <>
      <Stack />
      <NotifyProvider />
    </>
  );
}
