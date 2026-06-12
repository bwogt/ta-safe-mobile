import { Ionicons } from '@expo/vector-icons';
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
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" style={styles.icon} />
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
        <View style={styles.iconContainer}>
          <Ionicons name="alert-circle" style={styles.icon} />
        </View>
      )}
    />
  ),
};

const styles = StyleSheet.create({
  toast: {
    borderLeftWidth: 0,
    borderRadius: 8,
  },
  iconContainer: {
    justifyContent: 'center',
    paddingLeft: 12,
  },
  icon: {
    fontSize: 24,
    color: '#ffffff',
  },
  text: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  success: {
    backgroundColor: '#20D66B',
  },
  error: {
    backgroundColor: '#ff0000',
  },
});
