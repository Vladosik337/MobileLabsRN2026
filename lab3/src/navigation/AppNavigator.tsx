import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { ChallengesScreen } from '../screens/ChallengesScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { useTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

export const AppNavigator: React.FC = () => {
  const { theme, isDark } = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.iconColor,
          tabBarStyle: {
            backgroundColor: theme.surface,
            borderTopColor: theme.border,
            paddingBottom: 8,
            paddingTop: 8,
            height: 60,
          },
          headerStyle: {
            backgroundColor: theme.surface,
          },
          headerTintColor: theme.text,
          headerShadowVisible: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Gesture Clicker',
            tabBarLabel: 'Play',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="play-circle" size={size} color={color} />
            ),
            headerLeft: () => (
              <MaterialCommunityIcons
                name="menu"
                size={24}
                color={theme.text}
                style={{ marginLeft: 16 }}
              />
            ),
            headerRight: () => (
              <MaterialCommunityIcons
                name="magnify"
                size={24}
                color={theme.text}
                style={{ marginRight: 16 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Challenges"
          component={ChallengesScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="format-list-checks" size={size} color={color} />
            ),
            headerLeft: () => (
              <MaterialCommunityIcons
                name="menu"
                size={24}
                color={theme.text}
                style={{ marginLeft: 16 }}
              />
            ),
            headerRight: () => (
              <MaterialCommunityIcons
                name="magnify"
                size={24}
                color={theme.text}
                style={{ marginRight: 16 }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
