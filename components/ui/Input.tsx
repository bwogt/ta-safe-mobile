import { useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type InputProps = TextInputProps & {
  label: string;
  value: string;
  className?: string;
};

export function Input({ label, value, className, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const labelColor = isFocused ? 'text-primary' : 'text-neutral';
  const borderColor = isFocused ? 'border-primary' : 'border-neutral';
  const baseLabelStyle = 'text-md absolute -top-3 left-3 bg-gray-100 px-1';

  return (
    <View className={`${className} ${borderColor}`}>
      <Text className={`${baseLabelStyle} ${labelColor}`}>{label}</Text>
      <TextInput
        {...props}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
}
