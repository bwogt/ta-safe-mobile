import Auth from '@/components/auth/Auth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PageHeader from '@/components/ui/PageHeader';
import TextLink from '@/components/ui/TextLink';

import { usePasswordResetStart } from '@/queries/password-reset/usePasswordResetStart';
import { PasswordResetStartRequest } from '@/schemas/auth';
import { Ionicons } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export default function PasswordResetStart() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PasswordResetStartRequest>();

  const { t } = useTranslation(['auth', 'common']);
  const { mutate: start, isPending } = usePasswordResetStart(setError);
  const onSubmit = (data: PasswordResetStartRequest) => start(data);

  return (
    <Auth>
      <View className="flex-1 justify-center gap-2xl px-lg ">
        <PageHeader
          title={t('auth:reset.start.title')}
          subtitle={t('auth:reset.start.subtitle')}
        />

        <Controller
          name="email"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              label={t('common:fields.email')}
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
              ? t('common:loads.submitting')
              : t('auth:reset.actions.submitCode')
          }
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
          iconLeft={
            <Ionicons
              className="mr-2"
              name={isPending ? 'sync' : 'mail-outline'}
              size={20}
              color="white"
            />
          }
        />

        <TextLink
          href="/(public)/login"
          text={t('auth:reset.actions.backToLogin')}
          disabled={isPending}
        />
      </View>
    </Auth>
  );
}
