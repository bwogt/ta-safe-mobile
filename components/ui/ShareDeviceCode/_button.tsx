import { useGenerateDeviceShareCode } from '@/queries/device/useGenerateDeviceShareCode';
import { Device } from '@/schemas/device/base/device.schema';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

type Props = {
  device: Device;
  showModal: () => void;
};

export default function ShareDeviceCodeButton({ device, showModal }: Props) {
  const { mutateAsync: generateCode, isPending } = useGenerateDeviceShareCode();

  const onPress = async () => {
    if (!device.share_code) {
      await generateCode(String(device.id));
    }

    showModal();
  };

  return (
    <Pressable onPress={onPress} disabled={isPending}>
      <MaterialCommunityIcons name="share-variant-outline" size={22} />
    </Pressable>
  );
}
