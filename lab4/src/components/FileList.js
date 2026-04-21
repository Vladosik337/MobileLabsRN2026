import React from 'react';
import { FlatList, Text } from 'react-native';
import { styles } from '../styles/styles';
import { FileItem } from './FileItem';

export const FileList = ({ items, onItemPress, onItemInfo, onItemDelete }) => (
  <FlatList
    data={items}
    renderItem={({ item }) => (
      <FileItem
        item={item}
        onPress={() => onItemPress(item)}
        onInfo={() => onItemInfo(item)}
        onDelete={() => onItemDelete(item)}
      />
    )}
    keyExtractor={(item) => item.path}
    style={styles.list}
    ListEmptyComponent={
      <Text style={styles.emptyText}>Папка порожня</Text>
    }
  />
);
