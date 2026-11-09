import { colors } from '@/themes/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, PressableProps, Text, View } from 'react-native';

type ButtonVariants = 'neutral' | 'primary' | 'danger';

type Props = PressableProps & {
  label: string;
  variant?: ButtonVariants;
  iconLeft?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  iconRight?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
};

const variants: Record<
  ButtonVariants,
  {
    container: string;
    text: string;
    icon: string;
  }
> = {
  neutral: {
    container: 'bg-neutral',
    text: 'text-white',
    icon: 'white',
  },
  primary: {
    container: 'bg-primary',
    text: 'text-white',
    icon: 'white',
  },
  danger: {
    container: 'border border-danger-500',
    text: 'text-danger-500',
    icon: colors.danger[500],
  },
};

export default function Button({
  label,
  variant,
  disabled,
  iconLeft,
  iconRight,
  ...rest
}: Props) {
  const style = disabled ? variants['neutral'] : variants[variant ?? 'primary'];

  return (
    <Pressable
      {...rest}
      disabled={disabled}
      className={`rounded-md p-sm ${style.container} `}
    >
      <View className="flex-row items-center justify-center gap-2">
        {iconLeft && (
          <MaterialCommunityIcons
            name={iconLeft}
            size={22}
            color={style.icon}
          />
        )}

        <Text className={`text-center text-lg font-semibold ${style.text}`}>
          {label}
        </Text>

        {iconRight && (
          <MaterialCommunityIcons
            name={iconRight}
            size={22}
            color={style.icon}
          />
        )}
      </View>
    </Pressable>
  );
}
