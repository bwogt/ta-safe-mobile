import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { useRejectTransfer } from '@/queries/transfer/useRejectTransfer';
import { DeviceTransfer } from '@/schemas/transfer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

type Props = {
  transfer: DeviceTransfer;
};

export default function TransferReject({ transfer }: Props) {
  const { t } = useTranslation(['common', 'transfer']);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { mutate: reject, isPending } = useRejectTransfer(transfer.id);

  return (
    <>
      {transfer.type === 'received' && (
        <>
          <ConfirmDialog
            visible={modalVisible}
            title={t('transfer:reject.title')}
            subtitle={t('transfer:reject.subtitle')}
            onRequestClose={() => setModalVisible(false)}
            onConfirm={reject}
          />

          <View className="items-center gap-1">
            <Pressable
              disabled={isPending}
              onPress={() => setModalVisible(true)}
              className="h-12 w-12 items-center justify-center rounded-full border"
            >
              <MaterialCommunityIcons name="close" size={22} />
            </Pressable>

            <Text>{t('common:actions.reject')}</Text>
          </View>
        </>
      )}
    </>
  );
}
