import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const ListFooter = ({ loading }) => {
  if (!loading) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color="#007AFF" />
      <Text style={styles.text}>Завантаження...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    marginLeft: 8,
    color: '#666',
  },
});

export default ListFooter;
