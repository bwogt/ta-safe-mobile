import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import QuickAccessOption from './_option';

export default function QuickAccess() {
  const { t } = useTranslation(['common', 'dashboard']);

  return (
    <View className="p-4 pt-2">
      <View className="rounded-2xl border border-zinc-200 bg-white shadow">
        <View className="pl-4 pt-4">
          <Text className="text-lg font-bold">
            {t('dashboard:quickAccess.title')}
          </Text>
        </View>

        <View className="flex-row">
          <QuickAccessOption
            href="/(auth)/(drawer)/devices/register"
            icon="cellphone-key"
            label={t('dashboard:quickAccess.registerDevice')}
          />
        </View>
      </View>
    </View>
  );
}
