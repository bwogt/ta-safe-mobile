import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

export default function DeviceLookup() {
  const { t } = useTranslation(['common', 'device']);
  const [code, setCode] = useState('');
  const isLookupDisabled = code.length !== 8;

  const handlePress = () => {
    router.push(`/(auth)/(stack)/device/lookup/${code}`);
  };

  return (
    <View className="flex-1 justify-center px-4 pt-4">
      <View className="rounded-2xl border border-zinc-200 bg-white shadow">
        <View className="p-4">
          <View className="gap-2 pb-10">
            <Text className="text-lg font-bold">
              {t('device:lookup.title')}
            </Text>
            <Text>{t('device:lookup.subtitle')}</Text>
          </View>

          <Input
            label={t('common:fields.shareCode')}
            value={code}
            maxLength={8}
            keyboardType="number-pad"
            onChangeText={(text) => {
              const code = text.replace(/\D/g, '');
              setCode(code);
            }}
          />

          <Button
            label={t('common:actions.lookup')}
            disabled={isLookupDisabled}
            onPress={handlePress}
            iconLeft={
              <MaterialCommunityIcons
                name="shield-search"
                size={24}
                color="white"
              />
            }
          />
        </View>
      </View>
    </View>
  );
}
