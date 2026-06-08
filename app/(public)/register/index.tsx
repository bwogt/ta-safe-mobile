import { AuthSwitchLink } from '@/components/ui/AuthSwitchLink';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import PageHeader from '@/components/ui/PageHeader';
import { useRegisterUser } from '@/queries/auth/useRegisterUser';
import { RegisterUserRequest } from '@/schemas/auth/register-user-request.schema';
import { maskCpf } from '@/utils/masks/maskCpf';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

export default function UserRegistrationScreen() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<RegisterUserRequest>();

  const { t } = useTranslation(['fields', 'register-user']);
  const [hidePassword, setHidePassword] = useState(true);
  const togglePassword = () => setHidePassword(!hidePassword);

  const { mutate: register, isPending } = useRegisterUser(setError);
  const onSubmit = (data: RegisterUserRequest) => register(data);

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
          <PageHeader
            title={t('register-user:title')}
            subtitle={t('register-user:subtitle')}
          />

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
                      onPress={isPending ? undefined : togglePassword}
                    />
                  }
                />
              )}
            />
          </View>

          <Button
            label={
              isPending
                ? t('register-user:submit')
                : t('register-user:createAccount')
            }
            disabled={!isValid || isPending}
            onPress={handleSubmit(onSubmit)}
            iconLeft={
              <Ionicons
                className="mr-2"
                name={isPending ? 'sync' : 'log-in-outline'}
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
