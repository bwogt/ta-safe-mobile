import Badge from '@/components/ui/Badge';
import Divider from '@/components/ui/Divider';
import { DeviceTransferStatus } from '@/schemas/transfer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';

type Props = {
  status: DeviceTransferStatus | null;
  setStatus: (status: DeviceTransferStatus | null) => void;
};

export default function TransferListControl({ status, setStatus }: Props) {
  const { t } = useTranslation(['common', 'transfer']);

  const options: {
    key: DeviceTransferStatus | null;
    label: string;
    icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  }[] = [
    {
      key: null,
      label: t('common:list.all_plural_feminine'),
      icon: 'format-list-bulleted',
    },
    {
      key: 'pending',
      label: t('transfer:states.pending_other'),
      icon: 'format-list-bulleted-triangle',
    },
    {
      key: 'accepted',
      label: t('transfer:states.accepted_other'),
      icon: 'playlist-check',
    },
    {
      key: 'canceled',
      label: t('transfer:states.canceled_other'),
      icon: 'playlist-remove',
    },
    {
      key: 'rejected',
      label: t('transfer:states.rejected_other'),
      icon: 'playlist-remove',
    },
  ];

  return (
    <View className="p-4">
      <View className="flex-row flex-wrap items-center gap-6">
        {options.map((option) => {
          const isActive = status === option.key;

          return (
            <Pressable
              key={option.key ?? 'all'}
              onPress={() => setStatus(option.key)}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <Badge
                label={option.label}
                icon={option.icon}
                active={isActive}
              />
            </Pressable>
          );
        })}
      </View>

      <Divider />
    </View>
  );
}
