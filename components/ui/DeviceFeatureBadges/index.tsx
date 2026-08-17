import { Device } from '@/schemas/device/base/device.schema';
import { DeviceSummary } from '@/schemas/device/pagination/device-summary.schema';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import Badge from '../Badge';

type DeviceFeatureBadgesProps = {
  device: Device | DeviceSummary;
};

type BadgeVariant = 'success' | 'warning' | 'info' | 'danger';
type BadgeIcon = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

type DeviceBadge = {
  key: string;
  label: string;
  validated: boolean | undefined;
};

function getDeviceBadges(device: Device | DeviceSummary): DeviceBadge[] {
  return [
    {
      key: 'brand',
      label: device.model.brand.name,
      validated: device.validated_attributes?.brand_name,
    },
    {
      key: 'model',
      label: device.model.name,
      validated: device.validated_attributes?.model_name,
    },
    {
      key: 'color',
      label: device.color,
      validated: device.validated_attributes?.color,
    },
    {
      key: 'ram',
      label: device.model.ram,
      validated: device.validated_attributes?.ram,
    },
    {
      key: 'storage',
      label: device.model.storage,
      validated: device.validated_attributes?.storage,
    },
  ];
}

function getBadgeConfig(
  validationStatus: Device['validation_status'],
  validated: boolean | undefined,
): {
  variant: BadgeVariant;
  icon: BadgeIcon;
} {
  if (validationStatus === 'pending') {
    return {
      variant: 'warning',
      icon: 'shield-lock-open-outline',
    };
  }

  if (validationStatus === 'in_analysis') {
    return {
      variant: 'info',
      icon: 'shield-alert-outline',
    };
  }

  return validated
    ? { variant: 'success', icon: 'shield-lock-outline' }
    : { variant: 'danger', icon: 'shield-remove-outline' };
}

export default function DeviceFeatureBadges({
  device,
}: DeviceFeatureBadgesProps) {
  const badges = getDeviceBadges(device);

  return (
    <View className="flex-row flex-wrap gap-6 p-4">
      {badges.map(({ key, label, validated }) => {
        const { variant, icon } = getBadgeConfig(
          device.validation_status,
          validated,
        );

        return <Badge key={key} label={label} variant={variant} icon={icon} />;
      })}
    </View>
  );
}
