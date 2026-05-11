import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoginFormData } from '@/schemas/login.schema';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function __Screen() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>();

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="gap-3xl flex-1 justify-center px-lg">
        <View className="gap-xl">
          <View>
            <Text className="text-4xl font-bold">Bem Vindo!</Text>
            <Text className="text-xl">Acesse sua conta para continuar.</Text>
          </View>

          <View className="gap-xl">
            <View>
              <Controller
                name="email"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="Email"
                    value={value}
                    className="rounded-lg border-2"
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
              />
            </View>

            <View>
              <Controller
                name="password"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="Senha"
                    value={value}
                    className="rounded-lg border-2"
                    onChangeText={onChange}
                    autoCapitalize="none"
                  />
                )}
              />
            </View>
          </View>
        </View>

        <Button
          label="Entrar"
          className="rounded bg-primary p-sm"
          iconLeft={
            <Ionicons
              className="mr-2"
              name="log-in-outline"
              size={20}
              color="white"
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}
