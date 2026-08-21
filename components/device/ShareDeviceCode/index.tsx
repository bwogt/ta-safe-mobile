import { Device } from '@/schemas/device/base/device.schema';
import { useState } from 'react';
import ShareDeviceCodeButton from './_button';
import ShareDeviceCodeModal from './_modal';

type Props = {
  device: Device;
};

export default function ShareDeviceCode({ device }: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <ShareDeviceCodeButton
        device={device}
        showModal={() => setModalVisible(true)}
      />

      <ShareDeviceCodeModal
        device={device}
        visible={modalVisible}
        closeModal={() => setModalVisible(false)}
      />
    </>
  );
}
