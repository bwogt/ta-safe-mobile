import { useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type InputProps = TextInputProps & {
  label: string;
  value: string;
  iconRight?: React.ReactNode;
};

export function Input({ label, value, iconRight, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const labelColor = isFocused ? 'text-primary' : 'text-neutral';
  const borderColor = isFocused ? 'border-primary' : 'border-neutral';
  const baseLabelStyle = 'absolute -top-3 left-3 bg-gray-100 px-1 z-10';

  return (
    <View className={`rounded-xl border-2 py-1  ${borderColor}`}>
      <Text className={`${baseLabelStyle} ${labelColor}`}>{label}</Text>

      <View className="flex-row">
        <TextInput
          {...props}
          className="flex-1 pl-2 text-lg"
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {iconRight && <View className="justify-center px-4">{iconRight}</View>}
      </View>
    </View>
  );
}
