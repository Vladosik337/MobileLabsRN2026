import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ContactItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.infoRow}>
        <Ionicons name="call-outline" size={16} color="#666" />
        <Text style={styles.infoText}>{item.phone}</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="mail-outline" size={16} color="#666" />
        <Text style={styles.infoText}>{item.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
});

export default ContactItem;
