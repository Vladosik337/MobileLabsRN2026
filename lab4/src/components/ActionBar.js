import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

export const ActionBar = ({ onCreateFolder, onCreateFile }) => (
  <View style={styles.actionsBar}>
    <TouchableOpacity style={styles.createButton} onPress={onCreateFolder}>
      <Text style={styles.createButtonText}>+ Нова папка</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.createButton} onPress={onCreateFile}>
      <Text style={styles.createButtonText}>+ Новий файл</Text>
    </TouchableOpacity>
  </View>
);
