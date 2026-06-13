import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useCurrentUser } from '@/queries/user/useCurrentUser';
import { useUpdateProfile } from '@/queries/user/useUpdateProfile';
import { UpdateProfileRequest } from '@/schemas/user/update-profile.request.schema';
import { colors } from '@/themes/colors';
import { Ionicons } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export default function ProfileScreen() {
  const { data: user } = useCurrentUser();
  const { t } = useTranslation('common');

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileRequest>({
    values: user ? { name: user.name, email: user.email } : undefined,
  });

  const { mutate: updateProfile } = useUpdateProfile(setError);
  const onSubmit = async (data: UpdateProfileRequest) => updateProfile(data);

  return (
    <View className="gap-xl px-lg pt-lg">
      <View>
        <View className="items-center pb-md">
          <Ionicons name="person-circle" size={140} color={colors.neutral} />
        </View>

        <View>
          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                label={t('fields.name')}
                value={value}
                error={errors.name?.message}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                label={
                  user?.email_verified_at
                    ? t('fields.email')
                    : t('fields.emailNotVerified')
                }
                value={value}
                error={errors.email?.message}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />

          <Input label={t('fields.cpf')} value={user?.cpf} editable={false} />
        </View>
      </View>

      <Button
        label={t('actions.update')}
        onPress={handleSubmit(onSubmit)}
        disabled={!isDirty}
      />
    </View>
  );
}
