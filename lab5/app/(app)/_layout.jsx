import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function AppLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Каталог',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="details/[id]"
        options={{
          title: 'Деталі товару',
          headerShown: true,
        }}
      />
    </Stack>
  );
}
