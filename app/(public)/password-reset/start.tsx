import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import PageHeader from '@/components/ui/PageHeader';
import { TextLink } from '@/components/ui/TextLink';
import { usePasswordResetStart } from '@/queries/password-reset/usePasswordResetStart';
import { PasswordResetStartRequest } from '@/schemas/password-reset/password-reset-start.shema';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PasswordResetStart() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PasswordResetStartRequest>();

  const { t } = useTranslation(['fields', 'password-reset-start']);
  const { mutate: passwordReset, isPending } = usePasswordResetStart(setError);
  const onSubmit = (data: PasswordResetStartRequest) => passwordReset(data);

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1 justify-center gap-2xl px-lg">
          <PageHeader
            title={t('password-reset-start:title')}
            subtitle={t('password-reset-start:subtitle')}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                label={t('fields:email')}
                value={value}
                editable={!isPending}
                error={errors.email?.message}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />

          <Button
            label={
              isPending
                ? t('password-reset-start:submit')
                : t('password-reset-start:send')
            }
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
            iconLeft={
              <Ionicons
                className="mr-2"
                name={isPending ? 'sync' : 'barcode-outline'}
                size={20}
                color="white"
              />
            }
          />

          <TextLink
            href="/(public)/login"
            text={t('password-reset-start:backToLogin')}
            className="text-center text-lg font-semibold text-primary"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
