import { Device } from '@/schemas/device/base/device.schema';
import { Modal, View } from 'react-native';
import ShareDeviceCodeModalBackdrop from './_backdrop';
import ShareDeviceCodeModalContent from './_content';

type Props = {
  device: Device;
  visible: boolean;
  closeModal: () => void;
};

export default function ShareDeviceCodeModal({
  device,
  visible,
  closeModal,
}: Props) {
  if (device.share_code) {
    return (
      <Modal
        visible={visible}
        animationType="fade"
        transparent
        onRequestClose={closeModal}
      >
        <View className="flex-1 items-center justify-center">
          <ShareDeviceCodeModalBackdrop closeModal={closeModal} />
          <ShareDeviceCodeModalContent device={device} />
        </View>
      </Modal>
    );
  }
}
