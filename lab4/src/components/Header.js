import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/styles';

export const Header = () => (
  <View style={styles.header}>
    <Text style={styles.title}>Файловий менеджер</Text>
  </View>
);
