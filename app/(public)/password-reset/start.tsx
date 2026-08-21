import Auth from '@/components/auth/Auth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PageHeader from '@/components/ui/PageHeader';
import TextLink from '@/components/ui/TextLink';

import { usePasswordResetStart } from '@/queries/password-reset/usePasswordResetStart';
import { PasswordResetStartRequest } from '@/schemas/password-reset/start.request.schema';
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

  const { t } = useTranslation('password-reset');
  const { mutate: start, isPending } = usePasswordResetStart(setError);
  const onSubmit = (data: PasswordResetStartRequest) => start(data);

  return (
    <Auth>
      <View className="flex-1 justify-center gap-2xl px-lg ">
        <PageHeader title={t('start.title')} subtitle={t('start.subtitle')} />

        <Controller
          name="email"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              label={t('start.fields.email')}
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
              ? t('start.actions.submitting')
              : t('start.actions.submit')
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
          text={t('start.actions.backToLogin')}
          disabled={isPending}
        />
      </View>
    </Auth>
  );
}
