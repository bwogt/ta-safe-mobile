import Auth from '@/components/auth/Auth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PageHeader from '@/components/ui/PageHeader';
import TextLink from '@/components/ui/TextLink';

import { usePasswordReset } from '@/queries/password-reset/usePasswordReset';
import { PasswordResetRequest } from '@/schemas/auth';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export default function PasswordReset() {
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<PasswordResetRequest>();

  const { t } = useTranslation(['auth', 'common']);
  const { email, code } = useLocalSearchParams();
  const [hidePassword, setHidePassword] = useState(true);
  const togglePassword = () => setHidePassword(!hidePassword);

  const { mutate: passwordReset, isPending } = usePasswordReset(setError);
  const onSubmit = (data: PasswordResetRequest) => passwordReset(data);

  useEffect(() => {
    if (email && code) {
      setValue('email', email as string);
      setValue('code', code as string);
    }
  }, [email, code, setValue]);

  return (
    <Auth>
      <View className="flex-1 justify-center gap-2xl px-lg">
        <PageHeader
          title={t('auth:reset.final.title')}
          subtitle={t('auth:reset.final.subtitle', { email: email })}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              label={t('common:fields.newPassword')}
              value={value}
              error={errors.password?.message}
              editable={!isPending}
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

        <Button
          label={
            isPending
              ? t('common:loads.waiting')
              : t('auth:reset.actions.changePassword')
          }
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
          iconLeft={
            <Ionicons
              className="mr-2"
              name={'shield-checkmark-outline'}
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
