import { Pressable, PressableProps, Text, View } from 'react-native';

type ButtonProps = PressableProps & {
  label: string;
  className?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

export function Button({
  label,
  className,
  iconLeft,
  iconRight,
  ...props
}: ButtonProps) {
  return (
    <Pressable {...props} className={`${className}`}>
      <View className="flex-row items-center justify-center">
        {iconLeft}
        <Text className="text-center text-lg color-white">{label}</Text>
        {iconRight}
      </View>
    </Pressable>
  );
}
