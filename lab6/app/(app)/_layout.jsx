import { Stack, Redirect } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function AppLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4285F4" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />;
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
        name="index"
        options={{ title: 'Profile' }}
      />
      <Stack.Screen
        name="edit-profile"
        options={{ title: 'Edit Profile' }}
      />
      <Stack.Screen
        name="delete-account"
        options={{ title: 'Delete Account' }}
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
