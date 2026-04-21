import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SectionHeader = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#007AFF',
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SectionHeader;
