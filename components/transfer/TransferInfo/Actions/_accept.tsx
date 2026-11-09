import ConfirmDialog from '@/components/ui/ConfirmDialog';
import { useAcceptTransfer } from '@/queries/transfer/useAcceptTransfer';
import { DeviceTransfer } from '@/schemas/transfer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

type Props = {
  transfer: DeviceTransfer;
};

export default function TransferAccept({ transfer }: Props) {
  const { t } = useTranslation(['common', 'transfer']);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { mutate: accept, isPending } = useAcceptTransfer(transfer.id);

  return (
    <>
      {transfer.type === 'received' && (
        <>
          <ConfirmDialog
            title={t('transfer:accept.title')}
            subtitle={t('transfer:accept.subtitle')}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            onConfirm={accept}
          />

          <View className="items-center gap-1">
            <Pressable
              disabled={isPending}
              onPress={() => setModalVisible(true)}
              className="h-12 w-12 items-center justify-center rounded-full border"
            >
              <MaterialCommunityIcons name="check" size={22} />
            </Pressable>

            <Text>{t('common:actions.accept')}</Text>
          </View>
        </>
      )}
    </>
  );
}
