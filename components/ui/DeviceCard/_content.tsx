import { DeviceSummary } from '@/schemas/device/pagination/device-summary.schema';
import { View } from 'react-native';
import Badge from '../Badge';

type DeviceContentProps = {
  device: DeviceSummary;
};

type BadgeVariant = 'default' | 'success' | 'danger';

function badgeVariant(value: boolean | undefined): BadgeVariant {
  if (value === undefined) return 'default';
  return value ? 'success' : 'danger';
}

export default function DeviceCardContent({ device }: DeviceContentProps) {
  return (
    <View className="flex-row justify-around">
      <Badge
        label={device.model.brand.name}
        variant={badgeVariant(device.validated_attributes?.brand_name)}
      />

      <Badge
        label={device.color}
        variant={badgeVariant(device.validated_attributes?.color)}
      />

      <Badge
        label={device.model.ram}
        variant={badgeVariant(device.validated_attributes?.ram)}
      />

      <Badge
        label={device.model.storage}
        variant={badgeVariant(device.validated_attributes?.storage)}
      />
    </View>
  );
}
