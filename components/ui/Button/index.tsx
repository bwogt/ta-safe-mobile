import { Pressable, PressableProps, Text, View } from 'react-native';

type Props = PressableProps & {
  label: string;
  variant?: 'primary' | 'danger';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

export default function Button({
  label,
  variant,
  disabled,
  iconLeft,
  iconRight,
  ...rest
}: Props) {
  const variants = {
    primary: 'bg-primary',
    danger: 'bg-danger',
    neutral: 'bg-neutral',
  };

  const buttonStyle = disabled
    ? variants['neutral']
    : variants[variant ?? 'primary'];

  return (
    <Pressable
      {...rest}
      disabled={disabled}
      className={`${buttonStyle} rounded-md p-sm`}
    >
      <View className="flex-row items-center justify-center gap-2">
        {iconLeft}
        <Text className="text-center text-lg color-white">{label}</Text>
        {iconRight}
      </View>
    </Pressable>
  );
}
