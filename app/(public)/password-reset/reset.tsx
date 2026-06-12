import AuthScreen from '@/components/ui/AuthScreen';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PageHeader from '@/components/ui/PageHeader';
import TextLink from '@/components/ui/TextLink';

import { usePasswordReset } from '@/queries/password-reset/usePasswordReset';
import { PasswordResetRequest } from '@/schemas/password-reset/password-reset.schema';
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

  const { t } = useTranslation('password-reset');
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
    <AuthScreen>
      <View className="flex-1 justify-center gap-2xl px-lg">
        <PageHeader
          title={t('reset.title')}
          subtitle={t('reset.subtitle', { email: email })}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              label={t('reset.fields.newPassword')}
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
              ? t('reset.actions.submitting')
              : t('reset.actions.submit')
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
          text={t('reset.actions.backToLogin')}
          disabled={isPending}
        />
      </View>
    </AuthScreen>
  );
}
