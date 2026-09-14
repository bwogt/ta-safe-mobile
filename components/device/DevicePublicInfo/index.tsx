import Divider from '@/components/ui/Divider';
import { DevicePublic } from '@/schemas/device';
import { View } from 'react-native';
import DevicePublicInfoContent from './_content';
import DevicePublicInfoHeader from './_header';

type Props = {
  device: DevicePublic;
};

export default function DevicePublicInfo({ device }: Props) {
  return (
    <View className="mt-xl px-md">
      <View className="rounded-2xl border border-zinc-200 bg-white shadow">
        <DevicePublicInfoHeader device={device} />
        <Divider />
        <DevicePublicInfoContent device={device} />
      </View>
    </View>
  );
}
