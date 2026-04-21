import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { MainScreen, DetailsScreen, ContactsScreen } from '../screens';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ProfileModal = ({ visible, onClose }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <Pressable style={styles.modalOverlay} onPress={onClose}>
      <View style={styles.modalContent}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>Н</Text>
        </View>
        <Text style={styles.name}>Мотицький Н. В.</Text>
        <Text style={styles.group}>Група: ВТ-22-2</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Закрити</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  </Modal>
);

const NewsStack = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <>
      <ProfileModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            title: 'Новини',
            headerLeft: () => (
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => setModalVisible(true)}
              >
                <Ionicons name="person-circle-outline" size={28} color="#007AFF" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={({ route }) => ({
            title: route.params.item.title,
            headerTitleStyle: { fontSize: 16 },
          })}
        />
      </Stack.Navigator>
    </>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'NewsTab') {
              iconName = focused ? 'newspaper' : 'newspaper-outline';
            } else if (route.name === 'ContactsTab') {
              iconName = focused ? 'people' : 'people-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name="NewsTab"
          component={NewsStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Новини',
          }}
        />
        <Tab.Screen
          name="ContactsTab"
          component={ContactsScreen}
          options={{
            title: 'Контакти',
            tabBarLabel: 'Контакти',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    marginLeft: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 280,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  group: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AppNavigator;
