import Auth from '@/components/auth/Auth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PageHeader from '@/components/ui/PageHeader';
import TextLink from '@/components/ui/TextLink';

import { usePasswordResetCheckCode } from '@/queries/password-reset/usePasswordResetCheckCode';
import { PasswordResetCheckCodeRequest } from '@/schemas/password-reset/check-code.request.schema';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export default function PasswordResetCheck() {
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<PasswordResetCheckCodeRequest>();

  const { t } = useTranslation('password-reset');
  const { email } = useLocalSearchParams();

  const { mutate: checkCode, isPending } = usePasswordResetCheckCode(setError);
  const onSubmit = (data: PasswordResetCheckCodeRequest) => checkCode(data);

  useEffect(() => {
    if (email) {
      setValue('email', email as string);
    }
  }, [email, setValue]);

  return (
    <Auth>
      <View className="flex-1 justify-center gap-2xl px-lg">
        <PageHeader
          title={t('check.title')}
          subtitle={t('check.subtitle', { email: email })}
        />

        <Controller
          control={control}
          name="code"
          render={({ field: { value, onChange } }) => (
            <Input
              label={t('check.fields.code')}
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
              ? t('check.actions.submitting')
              : t('check.actions.submit')
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
          text={t('check.actions.backToLogin')}
          disabled={isPending}
        />
      </View>
    </Auth>
  );
}
