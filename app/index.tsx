import { useAuthStore } from '@/stores/auth/useAuthStore';
import { Redirect } from 'expo-router';

export default function Index() {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    return <Redirect href="/(auth)/(drawer)/profile" />;
  }

  return <Redirect href="/(public)/login" />;
}
