import { AuthScreen } from '@/components/ui/AuthScreen';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import PageHeader from '@/components/ui/PageHeader';
import { TextLink } from '@/components/ui/TextLink';
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

  const { t } = useTranslation(['password-reset']);
  const { email, code } = useLocalSearchParams();
  const [hidePassword, setHidePassword] = useState(true);
  const togglePassword = () => setHidePassword(!hidePassword);

  const { mutate: reset, isPending } = usePasswordReset(setError);
  const onSubmit = (data: PasswordResetRequest) => reset(data);

  useEffect(() => {
    if (email && code) {
      setValue('email', email as string);
      setValue('code', code as string);
    }
  }, [email, code]);

  return (
    <AuthScreen>
      <View className="flex-1 justify-center gap-2xl px-lg">
        <PageHeader
          title={t('password-reset:title')}
          subtitle={t('password-reset:subtitle', { email: email })}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              label={t('password-reset:fields:newPassword')}
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
              ? t('password-reset:actions:submit')
              : t('password-reset:actions:save')
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
          text={t('password-reset:actions:backToLogin')}
          className="text-center text-lg font-semibold text-primary"
        />
      </View>
    </AuthScreen>
  );
}
