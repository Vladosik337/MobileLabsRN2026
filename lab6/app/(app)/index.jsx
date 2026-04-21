import { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Platform
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

const showAlert = (title, message, buttons) => {
  if (Platform.OS === 'web') {
    const confirmButton = buttons.find(b => b.style === 'destructive' || b.text === 'Logout' || b.text === 'OK');
    const result = window.confirm(`${title}\n\n${message}`);
    if (result && confirmButton?.onPress) {
      confirmButton.onPress();
    }
  } else {
    Alert.alert(title, message, buttons);
  }
};

export default function Profile() {
  const { user, userProfile, logout, loadUserProfile } = useAuth();

  useEffect(() => {
    if (user) {
      loadUserProfile(user.uid);
    }
  }, [user]);

  const handleLogout = async () => {
    showAlert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            const result = await logout();
            if (result.success) {
              router.replace('/(auth)/login');
            } else {
              showAlert('Error', result.error, [{ text: 'OK' }]);
            }
          }
        }
      ]
    );
  };

  const ProfileItem = ({ label, value }) => (
    <View style={styles.profileItem}>
      <Text style={styles.profileLabel}>{label}</Text>
      <Text style={styles.profileValue}>{value || 'Not specified'}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {userProfile?.name ? userProfile.name[0].toUpperCase() : user?.email?.[0].toUpperCase()}
          </Text>
        </View>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.card}>
          <ProfileItem label="Name" value={userProfile?.name} />
          <ProfileItem label="Age" value={userProfile?.age} />
          <ProfileItem label="City" value={userProfile?.city} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions</Text>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/(app)/edit-profile')}
        >
          <Text style={styles.actionButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.dangerButton]}
          onPress={() => router.push('/(app)/delete-account')}
        >
          <Text style={[styles.actionButtonText, styles.dangerText]}>
            Delete Account
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4285F4',
    padding: 24,
    alignItems: 'center',
    paddingTop: 40,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  email: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  profileValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  actionButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#4285F4',
    fontWeight: '600',
    textAlign: 'center',
  },
  dangerButton: {
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  dangerText: {
    color: '#ff4444',
  },
  logoutButton: {
    backgroundColor: '#333',
    marginTop: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});
