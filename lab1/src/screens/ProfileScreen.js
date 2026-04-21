import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { Header, Footer } from '../components';
import { COLORS } from '../constants';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');

  const handleRegister = () => {
    Alert.alert('Успіх', 'Реєстрація успішна!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView
        style={styles.screenContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Реєстрація</Text>
        <View style={styles.form}>
          <Text style={styles.label}>Електронна пошта</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="example@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Пароль</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Введіть пароль"
            secureTextEntry
          />

          <Text style={styles.label}>Пароль (ще раз)</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Повторіть пароль"
            secureTextEntry
          />

          <Text style={styles.label}>Прізвище</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Введіть прізвище"
          />

          <Text style={styles.label}>Ім'я</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Введіть ім'я"
          />

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>Зареєструватися</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  screenContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginVertical: 16,
  },
  form: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  registerButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  registerButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
