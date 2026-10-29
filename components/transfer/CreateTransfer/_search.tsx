import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useCurrentUser } from '@/queries/user/useCurrentUser';
import { useUserByEmail } from '@/queries/user/useUserByEmail';
import { FindUserByEmailRequest, UserPublic } from '@/schemas/user';
import { Controller, useForm, useWatch } from 'react-hook-form';
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
  const { t } = useTranslation(['common', 'transfer']);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FindUserByEmailRequest>();

  const { mutate: findUser, isPending } = useUserByEmail(setError);
  const { data: currentUser } = useCurrentUser();

  const email = useWatch({ control, name: 'email' });
  const disabled = currentUser?.email === email || isPending;

  const label = isPending
    ? t('common:loads.waiting')
    : t('common:actions.next');

  const onSubmit = ({ email }: FindUserByEmailRequest) => {
    findUser(email, {
      onSuccess: (user) => {
        setTargetUser(user);
        nextStep();
      },
    });
  };

  return (
    <View className="w-full p-4">
      <View className="gap-4 rounded-lg border border-zinc-200 bg-white p-4">
        <View className="pb-8">
          <Text className="text-lg font-bold">
            {t('transfer:create.title')}
          </Text>
          <Text>{t('transfer:create.steps.searchUser')}</Text>
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
          label={label}
          disabled={disabled}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
}
