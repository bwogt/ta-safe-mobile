import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoginResponse } from '@/schemas/auth/login-response.schema';
import { RegisterUserRequest } from '@/schemas/auth/register-user-request.schema';
import api from '@/services/api';
import { applyValidationErrors } from '@/services/form/apply-validation-errors';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { Ionicons } from '@expo/vector-icons';
import { isAxiosError } from 'axios';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';

export default function UserRegistrationScreen() {
  const { t } = useTranslation(['fields', 'register-user']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const togglePassword = () => setHidePassword(!hidePassword);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterUserRequest>();

  const onSubmit = async (data: RegisterUserRequest) => {
    try {
      setIsSubmitting(true);
      const response = await api.post<LoginResponse>('/auth/register', data);
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
    <ScrollView>
      <Stack.Screen options={{ title: t('register-user:title') }} />
      <View className="mt-3xl flex-1 justify-center gap-2xl px-lg">
        <View>
          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                label={t('fields:name')}
                value={value}
                error={errors.name?.message}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                label={t('fields:email')}
                value={value}
                error={errors.email?.message}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />

          <Controller
            name="cpf"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                label={t('fields:cpf')}
                value={value}
                error={errors.cpf?.message}
                onChangeText={onChange}
                keyboardType="numeric"
                autoCapitalize="none"
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                label={t('fields:phone')}
                value={value}
                error={errors.phone?.message}
                onChangeText={onChange}
                keyboardType="phone-pad"
                autoCapitalize="none"
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                label={t('fields:password')}
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
                    onPress={isSubmitting ? undefined : togglePassword}
                  />
                }
              />
            )}
          />

          <Controller
            name="password_confirmation"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                label={t('fields:password_confirmation')}
                value={value}
                error={errors.password_confirmation?.message}
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

        <Button
          label={
            isSubmitting
              ? t('register-user:submit')
              : t('register-user:register')
          }
          disabled={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </ScrollView>
  );
}
