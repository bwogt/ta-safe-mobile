import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoginRequest } from '@/schemas/auth/login-request.schema';
import { LoginResponse } from '@/schemas/auth/login-response.schema';
import api from '@/services/api/api';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function __Screen() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginRequest>();

  const [hidePassword, setHidePassword] = useState(true);
  const togglePassword = () => setHidePassword(!hidePassword);

  const onSubmit = async (data: LoginRequest) => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', data);
      const auth = response.data.data;
      useAuthStore.setState({ user: auth.user, accessToken: auth.token });

      console.log(useAuthStore.getState());
    } catch (error: any) {
      const serverErrors = error.response?.data?.errors;

      if (serverErrors) {
        for (const [fieldName, message] of Object.entries(serverErrors)) {
          setError(fieldName as keyof LoginRequest, {
            message: message as string,
          });
        }
      }
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 justify-center gap-xl px-lg">
        <View className="gap-2xl">
          <View>
            <Text className="text-5xl font-bold">Bem vindo!</Text>
            <Text className="text-xl">Acesse sua conta para continuar.</Text>
          </View>

          <View>
            <View>
              <Controller
                name="email"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="Email"
                    value={value}
                    error={errors.email?.message}
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
                    error={errors.password?.message}
                    onChangeText={onChange}
                    autoCapitalize="none"
                    secureTextEntry={hidePassword}
                    iconRight={
                      <Ionicons
                        name={hidePassword ? 'eye-off' : 'eye'}
                        size={20}
                        color="black"
                        onPress={togglePassword}
                      />
                    }
                  />
                )}
              />
            </View>
          </View>
        </View>

        <Button
          label="Entrar"
          className="rounded bg-primary p-sm"
          onPress={handleSubmit(onSubmit)}
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
