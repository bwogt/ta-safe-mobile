import { View } from 'react-native';
import DeviceFeatureBadges from '../DeviceFeatureBadges';

import Divider from '@/components/ui/Divider';
import { Device, DevicePublic } from '@/schemas/device';
import DeviceFeaturesCardHeader from './_header';

type Props = {
  device: Device | DevicePublic;
};

export default function DeviceFeaturesCard({ device }: Props) {
  return (
    <View className="mt-xl px-md">
      <View className="rounded-2xl border border-zinc-200 bg-white shadow">
        <DeviceFeaturesCardHeader />
        <Divider />
        <DeviceFeatureBadges device={device} />
      </View>
    </View>
  );
}
