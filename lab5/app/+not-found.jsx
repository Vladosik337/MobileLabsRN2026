import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Помилка 404' }} />
      <View style={styles.container}>
        <Text style={styles.errorCode}>404</Text>
        <Text style={styles.title}>Екран не знайдено</Text>
        <Text style={styles.subtitle}>
          Сторінка, яку ви шукаєте, не існує або була переміщена.
        </Text>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Повернутися на головну</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  errorCode: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#ddd',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
