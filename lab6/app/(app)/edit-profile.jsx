import { useState, useEffect } from 'react';
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

const showAlert = (title, message, buttons = [{ text: 'OK' }]) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
    const okButton = buttons.find(b => b.text === 'OK' || b.onPress);
    if (okButton?.onPress) okButton.onPress();
  } else {
    Alert.alert(title, message, buttons);
  }
};

export default function EditProfile() {
  const { userProfile, updateProfile } = useAuth();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || '');
      setAge(userProfile.age?.toString() || '');
      setCity(userProfile.city || '');
    }
  }, [userProfile]);

  const handleSave = async () => {
    if (!name.trim()) {
      showAlert('Error', 'Please enter your name');
      return;
    }

    if (age && (isNaN(parseInt(age)) || parseInt(age) < 1 || parseInt(age) > 150)) {
      showAlert('Error', 'Please enter a valid age');
      return;
    }

    setLoading(true);
    const result = await updateProfile({
      name: name.trim(),
      age: age ? parseInt(age) : '',
      city: city.trim()
    });
    setLoading(false);

    if (result.success) {
      showAlert('Success', 'Profile updated successfully', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } else {
      showAlert('Error', result.error);
    }
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
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your age"
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
              maxLength={3}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your city"
              value={city}
              onChangeText={setCity}
              autoCapitalize="words"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Saving...' : 'Save Changes'}
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
  form: {
    width: '100%',
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
  button: {
    backgroundColor: '#4285F4',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    backgroundColor: '#a0c4ff',
  },
  buttonText: {
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
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});
