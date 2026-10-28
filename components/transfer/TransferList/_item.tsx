import Divider from '@/components/ui/Divider';
import { DeviceTransferSummary } from '@/schemas/transfer';
import { formatDatetime } from '@/utils/date/formatDatetime';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

type Props = {
  transfer: DeviceTransferSummary;
};

export default function TransferItem({ transfer }: Props) {
  const { t } = useTranslation(['common', 'transfer']);

  const icon = transfer.type == 'sent' ? 'tray-arrow-up' : 'tray-arrow-down';
  const title = t(`common:labels.transfer.${transfer.type}`);
  const brand = transfer.device_model.brand.name;
  const model = transfer.device_model.name;

  const onPress = () => {
    router.push(`/(auth)/(drawer)/transfers/(stack)/${transfer.id}`);
  };

  return (
    <>
      <View className="flex-row p-4">
        <View className="w-2/3 flex-row items-center gap-6">
          <View className="w-1/3 items-center gap-2">
            <View className="h-12 w-12 items-center justify-center rounded-full border border-gray-200">
              <MaterialCommunityIcons name={icon} size={22} />
            </View>

            <Text>{t(`transfer:states.${transfer.status}`, { count: 1 })}</Text>
          </View>

          <View className="w-full">
            <Text className="text-lg font-bold">{title}</Text>
            <Text>{`${brand} - ${model}`}</Text>
            <Text>{formatDatetime(transfer.created_at)}</Text>
          </View>
        </View>

        <Pressable
          onPress={onPress}
          className="w-1/3 flex-row items-center justify-end px-4"
        >
          <MaterialCommunityIcons name="arrow-expand" size={22} />
        </Pressable>
      </View>

      <Divider />
    </>
  );
}
