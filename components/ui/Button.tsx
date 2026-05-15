import { Pressable, PressableProps, Text, View } from 'react-native';

type ButtonProps = PressableProps & {
  label: string;
  variant?: 'primary' | 'danger';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

export function Button({
  label,
  variant,
  disabled,
  iconLeft,
  iconRight,
  ...props
}: ButtonProps) {
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
      {...props}
      disabled={disabled}
      className={`${buttonStyle} rounded-md p-sm`}
    >
      <View className="flex-row items-center justify-center">
        {iconLeft}
        <Text className="text-center text-lg color-white">{label}</Text>
        {iconRight}
      </View>
    </Pressable>
  );
}
