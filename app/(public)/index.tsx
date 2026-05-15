import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoginRequest } from '@/schemas/auth/login-request.schema';
import { LoginResponse } from '@/schemas/auth/login-response.schema';
import api from '@/services/api';
import { applyValidationErrors } from '@/services/form/apply-validation-errors';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { Ionicons } from '@expo/vector-icons';
import { isAxiosError } from 'axios';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const { t } = useTranslation('auth');
  const [hidePassword, setHidePassword] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const togglePassword = () => setHidePassword(!hidePassword);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginRequest>();

  const onSubmit = async (data: LoginRequest) => {
    try {
      setIsSubmitting(true);
      const response = await api.post<LoginResponse>('/auth/login', data);
      const auth = response.data.data;

      useAuthStore.setState({ user: auth.user, accessToken: auth.token });
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        applyValidationErrors(error, setError);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 justify-center gap-xl px-lg">
        <View className="gap-2xl">
          <View>
            <Text className="text-5xl font-bold">{t('title')}</Text>
            <Text className="text-xl">{t('subtitle')}</Text>
          </View>

          <View>
            <View>
              <Controller
                name="email"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    label={t('emailLabel')}
                    value={value}
                    editable={!isSubmitting}
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
                    label={t('passwordLabel')}
                    value={value}
                    error={errors.password?.message}
                    editable={!isSubmitting}
                    onChangeText={onChange}
                    autoCapitalize="none"
                    secureTextEntry={hidePassword}
                    iconRight={
                      <Ionicons
                        name={hidePassword ? 'eye-off' : 'eye'}
                        size={20}
                        color="black"
                        onPress={isSubmitting ? undefined : togglePassword}
                      />
                    }
                  />
                )}
              />
            </View>
          </View>
        </View>

        <Button
          label={isSubmitting ? t('submitButton') : t('loginButton')}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          iconLeft={
            <Ionicons
              className="mr-2"
              name={isSubmitting ? 'sync' : 'log-in-outline'}
              size={20}
              color="white"
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}
