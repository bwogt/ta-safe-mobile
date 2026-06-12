import { cn } from '@/utils/styles/cn';
import { useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type InputProps = TextInputProps & {
  label: string;
  value?: string;
  iconRight?: React.ReactNode;
  error?: string;
};

export function Input({
  label,
  value,
  iconRight,
  error,
  editable = true,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="min-h-4xl">
      <View
        className={cn(
          'rounded-xl border-2 border-neutral',
          isFocused && 'border-primary',
        )}
      >
        <Text
          className={cn(
            'absolute -top-3 left-3 z-10 bg-gray-100 px-1 text-neutral',
            isFocused && 'text-primary',
          )}
        >
          {label}
        </Text>

        <View className="flex-row">
          <TextInput
            {...props}
            value={value}
            editable={editable}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              'h-2xl flex-1 pl-2 text-lg ',
              !editable && 'text-neutral',
            )}
          />

          {iconRight && (
            <View className="justify-center px-4">{iconRight}</View>
          )}
        </View>
      </View>

      {error && <Text className="text-danger">{error}</Text>}
    </View>
  );
}
