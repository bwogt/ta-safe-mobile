import LoadingScreen from '@/components/ui/LoadingScreen';
import QueryError from '@/components/ui/QueryError';
import { useDeviceBrands } from '@/queries/device/useDeviceBrands';
import { Picker } from '@react-native-picker/picker';
import { Controller, useFormContext } from 'react-hook-form';
import { View } from 'react-native';

export default function DeviceBrandSelection() {
  const { control } = useFormContext();
  const { data: brands, isLoading, isError } = useDeviceBrands();

  if (isLoading) return <LoadingScreen />;

  return (
    <View className="flex-1 justify-center">
      {isError && <QueryError title="Ocorreu um erro ao carregar as marcas." />}

      {brands && !isError && (
        <Controller
          control={control}
          name="brand"
          render={({ field: { value, onChange } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={{
                borderBottomWidth: 2,
                borderColor: 'black',
              }}
            >
              <Picker.Item label="Selecione uma marca" value="" />

              {brands.map((brand) => (
                <Picker.Item
                  key={brand.id}
                  label={brand.name}
                  value={brand.id}
                />
              ))}
            </Picker>
          )}
        />
      )}
    </View>
  );
}
