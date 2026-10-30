import Button from '@/components/ui/Button';
import { useAcceptTransfer } from '@/queries/transfer/useAcceptTransfer';
import { useCancelTransfer } from '@/queries/transfer/useCancelTransfer';
import { useRejectTransfer } from '@/queries/transfer/useRejectTransfer';
import { DeviceTransfer } from '@/schemas/transfer';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

type Props = {
  transfer: DeviceTransfer;
};

export default function TransferInfoActions({ transfer }: Props) {
  const { t } = useTranslation('common');

  const { mutate: cancel, isPending: isCanceling } = useCancelTransfer(
    transfer.id,
  );

  const { mutate: accept, isPending: isAccepting } = useAcceptTransfer(
    transfer.id,
  );

  const { mutate: reject, isPending: isRejecting } = useRejectTransfer(
    transfer.id,
  );

  if (transfer.status === 'pending') {
    return (
      <View className="mt-14 justify-between">
        {transfer.type === 'sent' && (
          <View className="items-center">
            <View className="w-4/5">
              <Button
                label={t('common:actions.cancel')}
                onPress={() => cancel()}
                disabled={isCanceling}
                variant="danger"
                iconLeft="cancel"
              />
            </View>
          </View>
        )}

        {transfer.type === 'received' && (
          <View className="items-center gap-6">
            <View className="w-4/5">
              <Button
                label={t('common:actions.accept')}
                onPress={() => accept()}
                disabled={isAccepting}
              />
            </View>

            <View className="w-4/5">
              <Button
                label={t('common:actions.reject')}
                onPress={() => reject()}
                disabled={isRejecting}
                variant="danger"
                iconLeft="cancel"
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}
