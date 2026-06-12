import LoadingScreen from '@/components/ui/LoadingScreen';
import { useCurrentUser } from '@/queries/user/useCurrentUser';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { Redirect } from 'expo-router';
import { queryClient } from './_layout';

export default function Index() {
  const { isPending, isError } = useCurrentUser();

  if (isPending) {
    return <LoadingScreen />;
  }

  if (isError) {
    useAuthStore.getState().logout();
    queryClient.clear();

    return <Redirect href="/(public)/login" />;
  }

  return <Redirect href="/(auth)/(drawer)/profile" />;
}
