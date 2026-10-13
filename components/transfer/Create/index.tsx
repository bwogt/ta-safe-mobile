import ModalBackdrop from '@/components/ui/ModalBackdrop';
import { Device } from '@/schemas/device';
import { UserPublic } from '@/schemas/user';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { TransferOwnershipConfirmation } from './_confirmation';
import { TransferOwnershipSearchUser } from './_search';

type Props = {
  device: Device;
};

export default function CreateTransfer({ device }: Props) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [targetUser, setTargetUser] = useState<UserPublic>();

  const closeModal = () => {
    setModalVisible(false);
    setStep(1);
  };

  const nextStep = () => setStep(2);
  const previousStep = () => setStep(1);

  return (
    <>
      <Pressable onPress={() => setModalVisible(true)}>
        <MaterialCommunityIcons name="invoice-text-send-outline" size={26} />
      </Pressable>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={closeModal}
      >
        <View className="flex-1 items-center justify-center">
          <ModalBackdrop closeModal={closeModal} />

          {step === 1 && (
            <TransferOwnershipSearchUser
              setTargetUser={setTargetUser}
              nextStep={nextStep}
            />
          )}

          {step === 2 && targetUser && (
            <TransferOwnershipConfirmation
              device={device}
              targetUser={targetUser}
              previousStep={previousStep}
              closeModal={closeModal}
            />
          )}
        </View>
      </Modal>
    </>
  );
}
