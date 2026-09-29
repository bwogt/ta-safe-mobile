import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { BaseToast, ToastConfigParams } from 'react-native-toast-message';

export const toastConfig = {
  success: (props: ToastConfigParams<any>) => (
    <BaseToast
      {...props}
      text1NumberOfLines={0}
      text1Style={styles.text}
      style={[styles.toast, styles.success]}
      renderLeadingIcon={() => (
        <View style={[styles.iconContainer]}>
          <View style={[styles.iconSuccessBorder]}>
            <MaterialCommunityIcons
              name="check-circle"
              color="#00B82F"
              size={22}
            />
          </View>
        </View>
      )}
    />
  ),

  error: (props: ToastConfigParams<any>) => (
    <BaseToast
      {...props}
      text1NumberOfLines={0}
      text1Style={styles.text}
      style={[styles.toast, styles.error]}
      renderLeadingIcon={() => (
        <View style={[styles.iconContainer]}>
          <MaterialCommunityIcons name="alert-circle" color="#fff" size={22} />
        </View>
      )}
    />
  ),
};

const styles = StyleSheet.create({
  toast: {
    marginTop: 30,
    borderLeftWidth: 0,
    borderRadius: 28,
  },
  iconContainer: {
    justifyContent: 'center',
    paddingLeft: 12,
  },
  iconSuccessBorder: {
    borderRadius: 9999,
    backgroundColor: '#bbf7d0',
    padding: 4,
  },
  text: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 700,
  },
  success: {
    backgroundColor: '#2E2E2E',
  },
  error: {
    backgroundColor: '#FF0000',
  },
});
