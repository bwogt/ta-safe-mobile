import AuthScreen from '@/components/ui/AuthScreen/index';
import AuthSwitchLink from '@/components/ui/AuthSwitchLink';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import TextLink from '@/components/ui/TextLink';

import { useLogin } from '@/queries/auth/useLogin';
import { LoginRequest } from '@/schemas/auth/login-request.schema';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginRequest>();

  const { t } = useTranslation('auth');
  const [hidePassword, setHidePassword] = useState(true);
  const togglePassword = () => setHidePassword(!hidePassword);

  const { mutate: login, isPending } = useLogin(setError);
  const onSubmit = (data: LoginRequest) => login(data);

  return (
    <AuthScreen>
      <View className="flex-1 justify-center gap-2xl px-lg">
        <View className="gap-2xl">
          <View>
            <Text className="text-5xl font-bold">{t('login.title')}</Text>
            <Text className="text-xl">{t('login.subtitle')}</Text>
          </View>

          <View>
            <View>
              <Controller
                name="email"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    label={t('login.fields.email')}
                    value={value}
                    editable={!isPending}
                    error={errors.email?.message}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
              />
            </View>

            <View>
              <Controller
                name="password"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    label={t('login.fields.password')}
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

              <TextLink
                href="/(public)/password-reset/start"
                text={t('login.actions.forgotPassword')}
                disabled={isPending}
                className="text-right"
              />
            </View>
          </View>
        </View>

        <Button
          label={
            isPending
              ? t('login.actions.submitting')
              : t('login.actions.submit')
          }
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
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
          href="/(public)/register"
          text={t('login.actions.noAccount')}
          actionText={t('login.actions.createAccount')}
          disabled={isPending}
        />
      </View>
    </AuthScreen>
  );
}
