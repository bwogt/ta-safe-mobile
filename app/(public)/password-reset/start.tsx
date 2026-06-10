import { AuthScreen } from '@/components/ui/AuthScreen';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import PageHeader from '@/components/ui/PageHeader';
import { TextLink } from '@/components/ui/TextLink';
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

  const { t } = useTranslation(['fields', 'password-reset-start']);
  const { mutate: start, isPending } = usePasswordResetStart(setError);
  const onSubmit = (data: PasswordResetStartRequest) => start(data);

  return (
    <AuthScreen>
      <View className="flex-1 justify-center gap-2xl px-lg ">
        <PageHeader
          title={t('password-reset-start:title')}
          subtitle={t('password-reset-start:subtitle')}
        />

        <Controller
          name="email"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              label={t('password-reset-start:fields:email')}
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
              ? t('password-reset-start:actions:submitting')
              : t('password-reset-start:actions:submit')
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
          text={t('password-reset-start:actions:backToLogin')}
          className="text-center text-lg font-semibold text-primary"
        />
      </View>
    </AuthScreen>
  );
}
