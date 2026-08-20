import { Stack } from 'expo-router';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type AuthProps = {
  children: React.ReactNode;
};

export default function Auth({ children }: AuthProps) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
