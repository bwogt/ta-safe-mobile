import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import PageHeader from '@/components/ui/PageHeader';
import { TextLink } from '@/components/ui/TextLink';
import { usePasswordResetCheckCode } from '@/queries/password-reset/usePasswordResetCheckCode';
import { PasswordResetCheckCodeRequest } from '@/schemas/password-reset/check-code.request.shema';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PasswordResetCheck() {
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<PasswordResetCheckCodeRequest>();

  const { t } = useTranslation(['fields', 'password-reset-check']);
  const { email } = useLocalSearchParams();

  const { mutate: checkCode, isPending } = usePasswordResetCheckCode(setError);
  const onSubmit = (data: PasswordResetCheckCodeRequest) => checkCode(data);

  useEffect(() => {
    if (email) {
      setValue('email', email as string);
    }
  }, [email, setValue]);

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1 justify-center gap-2xl px-lg">
          <PageHeader
            title={t('password-reset-check:title')}
            subtitle={t('password-reset-check:subtitle', { email: email })}
          />

          <Controller
            control={control}
            name="code"
            render={({ field: { value, onChange } }) => (
              <Input
                label={t('password-reset-check:code')}
                value={value}
                error={errors.code?.message}
                onChangeText={(text) => {
                  const onlyNumbers = text.replace(/\D/g, '');
                  onChange(onlyNumbers);
                }}
                maxLength={6}
                keyboardType="number-pad"
              />
            )}
          />

          <Button
            label={
              isPending
                ? t('password-reset-check:submit')
                : t('password-reset-check:verify')
            }
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
            iconLeft={
              <Ionicons
                className="mr-2"
                name={'barcode-outline'}
                size={20}
                color="white"
              />
            }
          />

          <TextLink
            href="/(public)/login"
            text={t('password-reset-check:backToLogin')}
            className="text-center text-lg font-semibold text-primary"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
