import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useUserByEmail } from '@/queries/user/useUserByEmail';
import { FindUserByEmailRequest, UserPublic } from '@/schemas/user';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

type Props = {
  setTargetUser: (user: UserPublic) => void;
  nextStep: () => void;
};

export function TransferOwnershipSearchUser({
  setTargetUser,
  nextStep,
}: Props) {
  const { t } = useTranslation(['common', 'device']);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FindUserByEmailRequest>({
    shouldUnregister: false,
  });

  const { mutateAsync: findUser, isPending } = useUserByEmail(setError);

  const onSubmit = async ({ email }: FindUserByEmailRequest) => {
    const user = await findUser(email);

    setTargetUser(user);
    nextStep();
  };

  return (
    <View className="w-full p-4">
      <View className="gap-4 rounded-lg border border-zinc-200 bg-white p-4">
        <View className="pb-8">
          <Text className="text-lg font-bold">
            {t('device:transfer.title')}
          </Text>
          <Text>{t('device:transfer.steps.searchUser')}</Text>
        </View>

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
            isPending ? t('common:actions.wait') : t('common:actions.next')
          }
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
}
