import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen, GalleryScreen, ProfileScreen } from '../screens';
import { COLORS } from '../constants';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName, focused) => {
  const icons = {
    'Головна': focused ? 'home' : 'home-outline',
    'Фотогалерея': focused ? 'images' : 'images-outline',
    'Профіль': focused ? 'person' : 'person-outline',
  };
  return icons[routeName];
};

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        const iconName = getTabBarIcon(route.name, focused);
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
      tabBarStyle: styles.tabBar,
      tabBarLabelStyle: styles.tabBarLabel,
    })}
  >
    <Tab.Screen name="Головна" component={HomeScreen} />
    <Tab.Screen name="Фотогалерея" component={GalleryScreen} />
    <Tab.Screen name="Профіль" component={ProfileScreen} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 4,
    height: 60,
  },
  tabBarLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
});

export default AppNavigator;
