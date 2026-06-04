import { AuthSwitchLink } from '@/components/ui/AuthSwitchLink';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoginResponse } from '@/schemas/auth/login-response.schema';
import { RegisterUserRequest } from '@/schemas/auth/register-user-request.schema';
import api from '@/services/api';
import { applyValidationErrors } from '@/services/form/apply-validation-errors';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { maskCpf } from '@/utils/masks/maskCpf';
import { Ionicons } from '@expo/vector-icons';
import { isAxiosError } from 'axios';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';

export default function UserRegistrationScreen() {
  const { t } = useTranslation(['fields', 'register-user']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const togglePassword = () => setHidePassword(!hidePassword);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<RegisterUserRequest>();

  const onSubmit = async (data: RegisterUserRequest) => {
    try {
      Keyboard.dismiss();
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 48,
        }}
      >
        <Stack.Screen options={{ headerShown: false }} />
        <View className="mt-3xl flex-1 justify-center gap-2xl px-lg">
          <View className="gap-sm">
            <Text className="text-2xl font-bold text-primary">
              {t('register-user:title')}
            </Text>
            <Text className="text-xl text-subtitle">
              {t('register-user:subtitle')}
            </Text>
          </View>

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
                  onChangeText={(text) => onChange(maskCpf(text))}
                  keyboardType="numeric"
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
          </View>

          <Button
            label={
              isSubmitting
                ? t('register-user:submit')
                : t('register-user:createAccount')
            }
            disabled={!isValid || isSubmitting}
            onPress={handleSubmit(onSubmit)}
            iconLeft={
              <Ionicons
                className="mr-2"
                name={isSubmitting ? 'sync' : 'log-in-outline'}
                size={20}
                color="white"
              />
            }
          />

          <AuthSwitchLink
            href="/(public)/login"
            text={t('register-user:haveAccount')}
            actionText={t('register-user:login')}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
