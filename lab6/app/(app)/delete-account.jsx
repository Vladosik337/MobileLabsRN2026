import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

const showAlert = (title, message, buttons) => {
  if (Platform.OS === 'web') {
    const confirmButton = buttons.find(b => b.style === 'destructive' || b.text === 'OK' || b.text === 'Delete Forever');
    if (buttons.length === 1) {
      window.alert(`${title}\n\n${message}`);
      if (confirmButton?.onPress) confirmButton.onPress();
    } else {
      const result = window.confirm(`${title}\n\n${message}`);
      if (result && confirmButton?.onPress) {
        confirmButton.onPress();
      }
    }
  } else {
    Alert.alert(title, message, buttons);
  }
};

export default function DeleteAccount() {
  const [password, setPassword] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [loading, setLoading] = useState(false);
  const { deleteAccount, user } = useAuth();

  const handleDelete = async () => {
    if (!password) {
      showAlert('Error', 'Please enter your password', [{ text: 'OK' }]);
      return;
    }

    if (confirmText !== 'DELETE') {
      showAlert('Error', 'Please type DELETE to confirm', [{ text: 'OK' }]);
      return;
    }

    showAlert(
      'Final Confirmation',
      'This action cannot be undone. Are you absolutely sure you want to delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Forever',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            const result = await deleteAccount(password);
            setLoading(false);

            if (result.success) {
              showAlert('Account Deleted', 'Your account has been permanently deleted', [
                { text: 'OK', onPress: () => router.replace('/(auth)/login') }
              ]);
            } else {
              showAlert('Error', result.error, [{ text: 'OK' }]);
            }
          }
        }
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>Warning!</Text>
          <Text style={styles.warningText}>
            You are about to permanently delete your account. This action cannot be undone.
            All your data will be lost forever.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.email}>Deleting account: {user?.email}</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Enter your password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Type DELETE to confirm</Text>
            <TextInput
              style={styles.input}
              placeholder="Type DELETE"
              value={confirmText}
              onChangeText={setConfirmText}
              autoCapitalize="characters"
            />
          </View>

          <TouchableOpacity
            style={[
              styles.deleteButton,
              (loading || confirmText !== 'DELETE') && styles.buttonDisabled
            ]}
            onPress={handleDelete}
            disabled={loading || confirmText !== 'DELETE'}
          >
            <Text style={styles.deleteButtonText}>
              {loading ? 'Deleting...' : 'Delete My Account'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  warningBox: {
    backgroundColor: '#fff3cd',
    borderWidth: 1,
    borderColor: '#ffc107',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
  form: {
    width: '100%',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    backgroundColor: '#e89a9f',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelButtonText: {
    color: '#4285F4',
    fontSize: 16,
    fontWeight: '600',
  },
});
