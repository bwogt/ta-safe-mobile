import { DeviceTransferHistory } from '@/schemas/device';
import { formatDatetime } from '@/utils/date/formatDatetime';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

type Props = {
  transfer: DeviceTransferHistory;
};

export default function TransferHistoryInfo({ transfer }: Props) {
  const { t } = useTranslation('common');
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <View className="gap-6 py-4">
      <Pressable
        className="flex-row items-center justify-between"
        onPress={() => setExpanded((prev) => !prev)}
      >
        <Text className="text-lg font-semibold">
          {formatDatetime(transfer.updated_at)}
        </Text>

        <MaterialCommunityIcons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={22}
        />
      </Pressable>

      {expanded && (
        <>
          <View className="flex-row items-center gap-8">
            <MaterialCommunityIcons
              name="account-circle"
              size={42}
              color="gray"
            />

            <View>
              <Text>{t('common:labels.transfer.newOwner')}</Text>
              <Text>{transfer.target_user.name}</Text>
              <Text>{transfer.target_user.cpf}</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-8">
            <MaterialCommunityIcons
              name="account-circle"
              size={42}
              color="gray"
            />

            <View>
              <Text>{t('common:labels.transfer.oldOwner')}</Text>
              <Text>{transfer.source_user.name}</Text>
              <Text>{transfer.source_user.cpf}</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}
