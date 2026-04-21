import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { GameProvider } from './src/context/GameContext';
import { AppNavigator } from './src/navigation/AppNavigator';

const AppContent: React.FC = () => {
  const { isDark } = useTheme();
  return (
    <>
      <AppNavigator />
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <GameProvider>
            <AppContent />
          </GameProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
