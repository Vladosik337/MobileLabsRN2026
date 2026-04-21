import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

export const PathBar = ({ currentPath, canGoUp, onGoUp }) => (
  <View style={styles.pathContainer}>
    {canGoUp && (
      <TouchableOpacity style={styles.upButton} onPress={onGoUp}>
        <Text style={styles.upButtonText}>Вгору</Text>
      </TouchableOpacity>
    )}
    <Text style={styles.pathText} numberOfLines={1}>
      {currentPath}
    </Text>
  </View>
);
