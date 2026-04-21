import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';
import { formatBytes } from '../utils/helpers';

export const FileItem = ({ item, onPress, onInfo, onDelete }) => (
  <View style={styles.itemContainer}>
    <TouchableOpacity style={styles.itemContent} onPress={onPress}>
      <Text style={styles.itemIcon}>
        {item.isDirectory ? '\uD83D\uDCC1' : '\uD83D\uDCC4'}
      </Text>
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.itemMeta}>
          {item.isDirectory ? 'Папка' : formatBytes(item.size)}
        </Text>
      </View>
    </TouchableOpacity>
    <View style={styles.itemActions}>
      <TouchableOpacity style={styles.actionButton} onPress={onInfo}>
        <Text style={styles.actionIcon}>i</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
        <Text style={styles.actionIcon}>X</Text>
      </TouchableOpacity>
    </View>
  </View>
);
