import { useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type InputProps = TextInputProps & {
  label: string;
  value: string;
  iconRight?: React.ReactNode;
  error?: string;
};

export function Input({
  label,
  value,
  iconRight,
  error,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const labelColor = isFocused ? 'text-primary' : 'text-neutral';
  const borderColor = isFocused ? 'border-primary' : 'border-neutral';
  const baseLabelStyle = 'absolute -top-3 left-3 bg-gray-100 px-1 z-10';

  return (
    <View className="min-h-4xl">
      <View className={`rounded-xl border-2  ${borderColor}`}>
        <Text className={`${baseLabelStyle} ${labelColor}`}>{label}</Text>

        <View className="flex-row">
          <TextInput
            {...props}
            className="h-2xl flex-1 pl-2 text-lg"
            value={value}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          {iconRight && (
            <View className="justify-center px-4">{iconRight}</View>
          )}
        </View>
      </View>

      {error && <Text className="text-error">{error}</Text>}
    </View>
  );
}
