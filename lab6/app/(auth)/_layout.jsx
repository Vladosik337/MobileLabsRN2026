import { Stack } from 'expo-router';
import { Redirect } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function AuthLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4285F4" />
      </View>
    );
  }

  if (user) {
    return <Redirect href="/(app)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4285F4',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="login"
        options={{ title: 'Login' }}
      />
      <Stack.Screen
        name="register"
        options={{ title: 'Register' }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{ title: 'Reset Password' }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
